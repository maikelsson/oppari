import {
  Controller,
  Param,
  Body,
  Get,
  Post as post,
  Put,
  Delete,
  JsonController,
} from "routing-controllers";
import { appDataSource } from "../data-source";
import { Post } from "../entities/post";

@JsonController("/posts")
export class PostController {
  private postRepository = appDataSource.getRepository(Post);
  @Get()
  async getAll() {
    const posts = await this.postRepository.find({});
    return { posts: posts };
  }

  @post()
  async create(@Body() post: Post) {
    try {
      const output = await this.postRepository.create(post);
      await this.postRepository.save(output);
      return { output };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
