import { User } from "../../domain/entities/User.js";
export class FindOrCreateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const existingUser = await this.userRepository.findByPhone(input.phone);
        if (existingUser) {
            return existingUser;
        }
        const user = new User({
            phone: input.phone,
            name: input.name,
        });
        return this.userRepository.save(user);
    }
}
