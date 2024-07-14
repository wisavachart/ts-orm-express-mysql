import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AUTHORS } from "../../constant/Dbtable";

@Entity(AUTHORS)
export class Author {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  bio: string;
  @Column({ nullable: false })
  image: string;
}
