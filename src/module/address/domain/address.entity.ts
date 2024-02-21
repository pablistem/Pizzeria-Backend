import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from 'src/common/domain/base.entity';
import { Profile } from 'src/module/profile/domain/profile.entity';

@Entity({ name: 'address'})
export class Address extends Base {

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;
  
  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => Profile, (profile) => profile.addresses)
  @JoinColumn({ name: 'profile' })
  profile: Profile;
}