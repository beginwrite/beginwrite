import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UsersModule } from './modules/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as fs from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typeDefs: [
        fs
          .readFileSync(
            require.resolve(
              '@beginwrite/app-graphql-codegen/dist/schema.graphql',
            ),
          )
          .toString(),
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
        }),
      ],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'beginwrite',
        synchronize: false,
        entities: [join(__dirname, './models/*.model{.ts,.js}')],
      }),
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
