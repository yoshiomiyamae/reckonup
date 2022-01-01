import { atom } from "recoil";
import { User } from "../models/system";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();


export const JwtTokenState = atom({
    key: "jwtToken",
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const RefreshTokenState = atom({
    key: "refreshToken",
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const UserState = atom<User>({
    key: "user",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const IsLoggedInState = atom<boolean>({
    key: "isLoggedIn",
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const UserNameState = atom<string>({
    key: "userName",
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const PasswordState = atom<string>({
    key: "password",
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const RememberMeState = atom<boolean>({
    key: "rememberMe",
    default: false,
    effects_UNSTABLE: [persistAtom],
});