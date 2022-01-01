import sys
from django.shortcuts import render, redirect
from django.views.generic import TemplateView, FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import (
    LoginView, LogoutView, PasswordChangeView,
    PasswordChangeDoneView, PasswordResetView,
    PasswordResetDoneView, PasswordResetConfirmView,
    PasswordResetCompleteView,
)
from django.urls import reverse_lazy
from django.contrib.auth import login, authenticate

from rest_framework.response import Response
from rest_framework import generics, permissions, status

from reckonup.api import create_viewset
from . import models
from . import forms

myself = sys.modules[__name__]
myself.__dict__.update(create_viewset(models))


class AuthenticationInformationView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        profile = models.Profile.objects.get(user=self.request.user.id)
        return Response(data={
            'id': request.user.id,
            'last_login': request.user.last_login,
            'username': request.user.username,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.email,
            'is_active': request.user.is_active,
            'is_staff': request.user.is_staff,
            'is_superuser': request.user.is_superuser,
            'date_joined': request.user.date_joined,
            'classification_id': profile.classification.id,
            'department_id':  profile.department.id,
        }, status=status.HTTP_200_OK)


class UserCreateView(FormView):
    form_class = forms.CustomUserCreationForm
    template_name = 'registration/create.html'
    success_url = reverse_lazy('accounts:profile')

    def form_valid(self, form):
        print(self.request.POST['next'])
        if self.request.POST['next'] == 'back':
            return render(
                self.request,
                'registration/create.html',
                {'form': form}
            )
        elif self.request.POST['next'] == 'confirm':
            return render(
                self.request,
                'registration/create_confirm.html',
                {'form': form}
            )
        elif self.request.POST['next'] == 'regist':
            form.save()
            user = authenticate(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password1'],
            )
            login(self.request, user)
            return super().form_valid(form)
        else:
            return redirect(reverse_lazy('base:top'))


class UserProfileView(LoginRequiredMixin, TemplateView):
    template_name = 'registration/profile.html'

    def get_queryset(self):
        return models.User.objects.get(id=self.request.user.id)


class EmailChangeView(LoginRequiredMixin, FormView):
    template_name = 'registration/change.html'
    form_class = forms.EmailChangeForm
    success_url = reverse_lazy('accounts:profile')

    def form_valid(self, form):
        form.update(user=self.request.user)
        return super().form_valid(form)

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs.update({
            'email': self.request.user.email,
        })
        return kwargs


class UserChangeView(LoginRequiredMixin, FormView):
    template_name = 'registration/change.html'
    form_class = forms.UserInfoChangeForm
    success_url = reverse_lazy('accounts:profile')

    def form_valid(self, form):
        form.update(user=self.request.user)
        return super().form_valid(form)

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs.update({
            'email': self.request.user.email,
            'first_name': self.request.user.first_name,
            'last_name': self.request.user.last_name,
        })
        return kwargs


class CustomLoginView(LoginView):
    form_class = forms.CustomAuthenticationForm


class CustomLogoutView(LogoutView):
    template_name = 'registration/logged_out.html'
    next_page = '/'


class CustomPasswordChangeView(PasswordChangeView):
    form_class = forms.CustomPasswordChangeForm
    template_name = 'registration/password_change_form.html'
    success_url = reverse_lazy('accounts:password_change_done')


class CustomPasswordChangeDoneView(PasswordChangeDoneView):
    template_name = 'registration/password_change_done.html'


class CustomPasswordResetView(PasswordResetView):
    email_template_name = 'registration/password_reset_email.html'
    form_class = forms.CustomPasswordResetForm
    from_email = 'info@example.com'
    subject_template_name = 'registration/password_reset_subject.txt'
    success_url = reverse_lazy('accounts:password_reset_done')
    template_name = 'registration/password_reset_form.html'


class CustomPasswordResetDoneView(PasswordResetDoneView):
    template_name = 'registration/password_reset_done.html'


class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    form_class = forms.CustomSetPasswordForm
    post_reset_login = False
    post_reset_login_backend = None
    success_url = reverse_lazy('accounts:password_reset_complete')
    template_name = 'registration/password_reset_confirm.html'


class CustomPasswordResetCompleteView(PasswordResetCompleteView):
    template_name = 'registration/password_reset_complete.html'
