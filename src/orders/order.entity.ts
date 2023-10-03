import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Pizza } from '../pizzas/pizza.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdOn: string;

  @Column({ default: 'initiated' })
  status: string;

  @Column()
  orderPrice: number;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Pizza)
  @JoinTable({
    name: 'order_pizzas',
    joinColumn: {
      name: 'orderId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'pizzaId',
      referencedColumnName: 'id',
    },
  })
  pizzas: Pizza[];
}
