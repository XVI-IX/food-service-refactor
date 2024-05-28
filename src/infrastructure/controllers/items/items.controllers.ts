import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from 'src/infrastructure/common/dto';
import { HttpResponse } from 'src/infrastructure/common/helpers/response.helper';
import { ItemService } from 'src/infrastructure/services/items/items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemService) {}

  @Post('/addToStore/:storeId')
  async addItemToStore(
    @Param('storeId') storeId: string,
    @Body() dto: CreateItemDto,
  ) {
    const response = await this.itemsService.addItemToStore(storeId, dto);
    return HttpResponse.send('Item added to store.', response);
  }

  @Get()
  async getAllItems(@Query('page') page: number) {
    const response = await this.itemsService.getAllItems(page);
    return HttpResponse.send('Items retrieved', response);
  }

  @Get('/storeItems/:storeId')
  async getAllStoreItems(
    @Param('storeId') storeId: string,
    @Query('page') page: number,
  ) {
    const response = await this.itemsService.getAllStoreItems(storeId, page);
    return HttpResponse.send('Store items retrieved', response);
  }

  @Get('/:itemId')
  async getItemById(@Param('itemId') itemId: string) {
    const response = await this.itemsService.getItemById(itemId);
    return HttpResponse.send('Item retrieved', response);
  }

  @Put('/:itemId')
  async updateItemById(
    @Param('itemId') itemId: string,
    @Body() dto: UpdateItemDto,
  ) {
    const response = await this.itemsService.updateItemById(itemId, dto);
    return HttpResponse.send('Item updated', response);
  }

  @Delete('/:itemId')
  async deleteItem(@Param('itemId') itemId: string) {
    const response = await this.itemsService.deleteItem(itemId);
    return HttpResponse.send('Item Deleted', response);
  }
}
