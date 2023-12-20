import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { asyncForEach } from "sequential-async-foreach";
import { readdir, readFile } from 'node:fs/promises'
const fs = require('fs');

@Controller('image')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('crop')
  @UseInterceptors(AnyFilesInterceptor())
  async getImages(@UploadedFiles() files: any): Promise<Array<string>> {

    const savePath = './public/img/';
    await asyncForEach(await files, async (file: Express.Multer.File) => {

      fs.writeFile(`${savePath}` + file.originalname, file.buffer, (err) => {
        if(err) {
          console.log('err has occured while saving file(s) -> ', err);
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
      })
    })
    
    await this.appService.pythonCropper()

    let imageArr: string[] = [];

    const filesInFolder = await readdir(savePath);
    
    await asyncForEach(await filesInFolder, async (file) => {
      await readFile(`${savePath}` + file).then(async (data) => {
        const encoded = "data:image/jpeg;base64," + data.toString('base64');
        await imageArr.push(encoded);
      })

    })

    await asyncForEach(await filesInFolder, async(file) => {
      await fs.unlink(`${savePath}` + file, async (err) => {
        if(err) console.log('Some error has occured while deleting images -> ', err)
        console.log('Files were deleted successfully')
      })
    })
    return imageArr

  }
}
