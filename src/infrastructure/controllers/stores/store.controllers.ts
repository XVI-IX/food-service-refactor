import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetAuthUser, IAuthUser } from 'src/infrastructure/common/decorators';
import { CreateStoreDto, UpdateStoreDto } from 'src/infrastructure/common/dto';
import { HttpResponse } from 'src/infrastructure/common/helpers/response.helper';
import { StoreService } from 'src/infrastructure/services/stores/stores.service';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createStore(
    @GetAuthUser() user: IAuthUser,
    @Body() dto: CreateStoreDto,
  ) {
    const response = await this.storeService.createStore(user, dto);
    return HttpResponse.send('Store created successfully', response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllStores(@Query('page') page: number) {
    const response = await this.storeService.getAllStores(page);
    return HttpResponse.send('Stores retrieved', response);
  }

  @Get('/userStores/:userId')
  @HttpCode(HttpStatus.OK)
  async getAllUserStores(
    @Param('userId') userId: string,
    @Query('page') page: number,
  ) {
    const response = await this.storeService.getAllUserStores(userId, page);
    return HttpResponse.send('Users stores retrieved', response);
  }

  @Get('/:storeId')
  @HttpCode(HttpStatus.OK)
  async getStoreById(@Param('storeId') storeId: string) {
    const response = await this.storeService.getStoreById(storeId);
    return HttpResponse.send('Store retrieved', response);
  }

  @Put('/:storeId')
  @HttpCode(HttpStatus.OK)
  async updateStoreById(
    @Param('storeId') storeId: string,
    @Body() dto: UpdateStoreDto,
  ) {
    const response = await this.storeService.updateStore(storeId, dto);
    return HttpResponse.send('Store updated', response);
  }

  @Delete('/:storeId')
  @HttpCode(HttpStatus.OK)
  async deleteStore(@Param('storeId') storeId: string) {
    const response = await this.storeService.deleteStore(storeId);
    return HttpResponse.send('Store deleted', response);
  }
}
