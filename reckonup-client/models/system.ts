export interface IUser {
  id: number;
  isActive?: boolean;
  lastLogin?: Date;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isSuperuser?: boolean;
  isStaff?: boolean;
  dateJoined?: Date;
  classificationId?: number;
  departmentId?: number;
}
export class User implements IUser {
  id: number;
  isActive?: boolean;
  lastLogin?: Date;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isSuperuser?: boolean;
  isStaff?: boolean;
  dateJoined?: Date;
  classificationId?: number;
  departmentId?: number;

  constructor(user: IUser) {
    this.id = user.id;
    this.isActive = user.isActive;
    this.lastLogin = user.lastLogin;
    this.userName = user.userName;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isSuperuser = user.isSuperuser;
    this.isStaff = user.isStaff;
    this.dateJoined = user.dateJoined;
    this.classificationId = user.classificationId;
    this.departmentId = user.departmentId;
  }

  static fromUserResponse = (userResponse: UserResponse) => new User({
    id: userResponse.id,
    isActive: userResponse.is_active,
    lastLogin: userResponse.last_login,
    userName: userResponse.username,
    firstName: userResponse.first_name,
    lastName: userResponse.last_name,
    email: userResponse.email,
    isSuperuser: userResponse.is_superuser,
    isStaff: userResponse.is_staff,
    dateJoined: new Date(userResponse.date_joined),
    classificationId: userResponse.classification_id,
    departmentId: userResponse.department_id,
  });
}

export interface UserResponse {
  id?: number;
  is_active?: boolean;
  last_login?: Date;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_superuser?: boolean;
  is_staff?: boolean;
  date_joined?: string;
  classification_id?: number;
  department_id?: number;
}

export interface IClassification {
  id: number;
  name: string;
}

export class Classification implements IClassification {
  id: number;
  name: string;

  constructor(classification: IClassification) {
    this.id = classification.id;
    this.name = classification.name;
  }

  static fromClassificationResponse = (classificationResponse: ClassificationResponse) => new Classification({
    id: classificationResponse.id,
    name: classificationResponse.name,
  });
}

export class ClassificationCollection extends Array<Classification>{
  get = (id: number): Classification => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      name: '',
    }
  );

  constructor(classifications: Classification[] = []) {
    super();
    if (!Array.isArray(classifications)) {
      return;
    }
    this.push(...classifications);
  }

  static fromClassificationResponseCollection = (classificationResponses: ClassificationResponseCollection) => new ClassificationCollection(
    classificationResponses.map(Classification.fromClassificationResponse)
  );
}

export interface ClassificationResponse {
  id?: number;
  name?: string;
}

export class ClassificationResponseCollection extends Array<ClassificationResponse>{
  get = (id: number): ClassificationResponse => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      name: '',
    }
  );
}

export interface IDepartment {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  parentId: number;
}

export class Department implements IDepartment {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  parentId: number;

  constructor(department: IDepartment) {
    this.id = department.id;
    this.name = department.name;
    this.latitude = department.latitude;
    this.longitude = department.longitude;
    this.parentId = department.parentId;
  }

  static fromDepartmentResponse(departmentResponse: DepartmentResponse) {
    return new Department({
      id: departmentResponse.id,
      name: departmentResponse.name,
      latitude: departmentResponse.latitude,
      longitude: departmentResponse.longitude,
      parentId: departmentResponse.parent_id,
    });
  }
}

export class DepartmentCollection extends Array<Department>{
  get = (id: number): Department => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      name: '',
      latitude: 0,
      longitude: 0,
      parentId: 0,
    }
  );

  constructor(departments: Department[] = []) {
    super();
    if (!Array.isArray(departments)) {
      return;
    }
    this.push(...departments);
  }

  static fromDepartmentResponseCollection = (departmentResponses: DepartmentResponseCollection) => new DepartmentCollection(
    departmentResponses.map(d => Department.fromDepartmentResponse(d))
  );
}

export interface DepartmentResponse {
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  parent_id?: number;
}

export class DepartmentResponseCollection extends Array<DepartmentResponse>{
  get = (id: number): DepartmentResponse => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      name: '',
      latitude: 0,
      longitude: 0,
      parent_id: 0,
    }
  );
}