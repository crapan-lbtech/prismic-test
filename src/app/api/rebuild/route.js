import { NextResponse } from 'next/server'
import { exec } from 'child_process'

export async function POST(req) {
 // banner2 in html
 
  return new Promise((resolve, reject) => {
    exec('npm run export', { cwd: process.cwd() }, (error, stdout, stderr) => {
      if (error) {
        //return reject(error) 
        resolve(NextResponse.json({
            message: error.message
          }))

      }
      
      resolve(NextResponse.json({
        message: 'Build completed'
      }))
    })
  })

}


// Webhook , banner2
// api/Rebuild