import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid} from "uuid";

@Entity("transaction")
export class Transaction {
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  account_id: string;

  @Column()
  value: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}