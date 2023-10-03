import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Order } from '../orders/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column({unique: true})
  phoneNumber: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  @Exclude()
  password: string;

  @Column({default: 'customer'})
  role: string;

  @Column()
  createdOn: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
