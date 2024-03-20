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
  street: string;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  postalCode: number;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'profile' })
  profile: Profile | number;
}