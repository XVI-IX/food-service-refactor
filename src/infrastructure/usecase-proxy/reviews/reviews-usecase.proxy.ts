import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { ReviewRepository } from 'src/infrastructure/repositories/review.repository';
import { UseCaseProxy } from '../usecase-proxy';
import { GetAllReviewsUseCase } from 'src/usecases/reviews/getAllReviews.usecase';
import { GetReviewByIdUseCase } from 'src/usecases/reviews/getReviewById.usecase';
import { GetAllItemReviewsUseCase } from 'src/usecases/reviews/getAllItemReviews.usecase';
import { GetAllStoreReviewsUseCase } from 'src/usecases/reviews/getAllStoreReviews.usecase';
import { AddItemReviewUseCase } from 'src/usecases/reviews/addItemReview.usecase';
import { AddStoreReviewUseCase } from 'src/usecases/reviews/addStoreReview.usecase';
import { DeleteReviewUseCase } from 'src/usecases/reviews/deleteReview.usecase';

export const REVIEWS_USECASE_CONSTANTS = {
  GET_ALL_REVIEWS: 'GET_ALL_REVIEWS_USECASE_PROXY',
  GET_REVIEW_BY_ID: 'GET_REVIEW_BY_ID_USECASE_PROXY',
  ADD_ITEM_REVIEW: 'ADD_ITEM_REVIEW_USECASE_PROXY',
  ADD_STORE_REVIEW: 'ADD_STORE_REVIEW_USECASE_PROXY',
  GET_ALL_ITEM_REVIEWS: 'GET_ALL_ITEM_REVIEWS_USECASE_PROXY',
  GET_ALL_STORE_REVIEWS: 'GET_ALL_STORE_REVIEWS_USECASE_PROXY',
  DELETE_REVIEW: 'DELETE_REVIEW_USECASE_PROXY',
};

@Module({
  imports: [RepositoriesModule],
})
export class ReviewsUseCaseProxyModule {
  static GET_ALL_REVIEWS_USE_CASES_PROXY = 'GetAllReviewsUseCaseProxy';
  static GET_REVIEW_BY_ID_USE_CASES_PROXY = 'GetReviewByIdUseCaseProxy';
  static ADD_ITEM_REVIEW_USE_CASES_PROXY = 'AddItemReviewUseCaseProxy';
  static ADD_STORE_REVIEW_USE_CASES_PROXY = 'AddStoreReviewUseCaseProxy';
  static GET_ALL_ITEM_REVIEWS_USE_CASES_PROXY = 'GetAllItemReviewsUseCaseProxy';
  static GET_ALL_STORE_REVIEWS_USE_CASES_PROXY =
    'GetAllStoreReviewsUseCaseProxy';
  static DELETE_REVIEW_USE_CASES_PROXY = 'DeleteReviewUseCaseProxy';

  static register() {
    return {
      module: ReviewsUseCaseProxyModule,
      providers: [
        {
          inject: [ReviewRepository],
          provide: ReviewsUseCaseProxyModule.GET_ALL_REVIEWS_USE_CASES_PROXY,
          useFactory: (reviewsRepository: ReviewRepository) =>
            new UseCaseProxy(new GetAllReviewsUseCase(reviewsRepository)),
        },
        {
          inject: [ReviewRepository],
          provide: ReviewsUseCaseProxyModule.GET_REVIEW_BY_ID_USE_CASES_PROXY,
          useFactory: (reviewRepository: ReviewRepository) =>
            new UseCaseProxy(new GetReviewByIdUseCase(reviewRepository)),
        },
        {
          inject: [ReviewRepository],
          provide:
            ReviewsUseCaseProxyModule.GET_ALL_ITEM_REVIEWS_USE_CASES_PROXY,
          useFactory: (reviewRepository: ReviewRepository) =>
            new UseCaseProxy(new GetAllItemReviewsUseCase(reviewRepository)),
        },
        {
          inject: [ReviewRepository],
          provide:
            ReviewsUseCaseProxyModule.GET_ALL_STORE_REVIEWS_USE_CASES_PROXY,
          useFactory: (reviewRepository: ReviewRepository) =>
            new UseCaseProxy(new GetAllStoreReviewsUseCase(reviewRepository)),
        },
        {
          inject: [ReviewRepository],
          provide: ReviewsUseCaseProxyModule.ADD_ITEM_REVIEW_USE_CASES_PROXY,
          useFactory: (reviewRepository: ReviewRepository) =>
            new UseCaseProxy(new AddItemReviewUseCase(reviewRepository)),
        },
        {
          inject: [ReviewRepository],
          provide: ReviewsUseCaseProxyModule.ADD_STORE_REVIEW_USE_CASES_PROXY,
          useFactory: (reviewRepository: ReviewRepository) =>
            new UseCaseProxy(new AddStoreReviewUseCase(reviewRepository)),
        },
        {
          inject: [ReviewRepository],
          provide: ReviewsUseCaseProxyModule.DELETE_REVIEW_USE_CASES_PROXY,
          useFactory: (reviewRepository: ReviewRepository) =>
            new UseCaseProxy(new DeleteReviewUseCase(reviewRepository)),
        },
      ],
    };
  }
}
