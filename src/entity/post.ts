import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  filename!: string;

  @Column()
  views!: number;

  @Column()
  isPublished!: boolean;
}
