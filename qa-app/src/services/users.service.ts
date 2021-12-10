import bcrypt from 'bcrypt';
import { CreateUserDto, UpdatedUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@/models/core/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await User.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await User.findOne({id: userId});
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await User.findOne({email: userData.email});
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await User.create({email: userData.email, password: hashedPassword}).save();

    return await User.findOne({id: createUserData.id});;
  }

  public async updateUser(userId: number, userData: UpdatedUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await User.findOne({id: userId}, {select: ["email", "password"]});
    if (!findUser) throw new HttpException(409, "You're not user");
    
    if (userData.password) User.merge(findUser, {password: await bcrypt.hash(userData.password, 10)}).save();
    
    return await User.findOne({id: userId});
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await User.findOne({id: userId});
    if (!findUser) throw new HttpException(409, "You're not user");
 
    return await findUser.remove();
  }
}

export default UserService;
