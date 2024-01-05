import { Controller } from '@nestjs/common';
import { ProfileService } from '../application/service/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
}
