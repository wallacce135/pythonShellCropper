import { Injectable } from '@nestjs/common';
import { PythonShell } from 'python-shell';

@Injectable()
export class AppService {
  
  async pythonCropper(): Promise<void> {

    PythonShell.run('./src/main.py', null).then((messages) => {
      console.log('finished')
    })

  }

}
