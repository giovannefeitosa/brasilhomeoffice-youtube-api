// const { User } = require('.prisma/client');
// const { PrismaClient } = require('@prisma/client');
import { User } from '.prisma/client';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// create();
refreshh();
// run();

async function refreshh() {
  const resDel = await prisma.pool.deleteMany({
    where: {
      NOT: {
        slug: ''
      }
    }
  })

  console.log(resDel);
}

async function run() {
  // const res = await prisma.pool.findMany();
  const res = await prisma.pool.findFirst({
    where: {
      slug: 'slug',
    },
    // rejectOnNotFound: true,
  });

  console.log(res);

  prisma.$disconnect();
}

async function create() {
  const res = await prisma.pool.create({
    data: {
      slug: 'slug',
      title: 'title',
      description: 'description',
    },
  });

  console.log(res);
  prisma.$disconnect();
}
