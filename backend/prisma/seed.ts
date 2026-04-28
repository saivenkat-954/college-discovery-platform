import { PrismaClient, CollegeType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];
const states = ['Delhi', 'Maharashtra', 'Karnataka', 'Telangana', 'Tamil Nadu', 'Maharashtra', 'West Bengal', 'Gujarat'];

const generateColleges = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const cityIndex = i % cities.length;
    const name = i === 0 ? 'Indian Institute of Technology (IIT), Delhi' : 
                 i === 1 ? 'Indian Institute of Technology (IIT), Bombay' :
                 i === 2 ? 'BITS Pilani' : 
                 i === 3 ? 'NIT Trichy' :
                 `Institute of Engineering & Science ${i + 1}`;
    
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return {
      name,
      slug,
      location: `${cities[cityIndex]}, ${states[cityIndex]}`,
      city: cities[cityIndex],
      state: states[cityIndex],
      description: `Description for ${name}. A premier educational institution providing high-quality technical education and research opportunities since its inception.`,
      establishedYear: 1950 + (i % 70),
      type: i % 4 === 0 ? CollegeType.GOVERNMENT : CollegeType.PRIVATE,
      rating: 3.5 + (Math.random() * 1.5),
      placementRate: 70 + (Math.random() * 25),
      highestPackage: 10 + (Math.random() * 90),
      cutoffRank: 100 + (i * 1500),
      ranking: i + 1,
      website: `https://${slug}.edu.in`,
      courses: {
        create: [
          { name: 'Computer Science', fees: 100000 + (Math.random() * 400000), duration: 4 },
          { name: 'Electronics', fees: 80000 + (Math.random() * 300000), duration: 4 },
        ],
      },
      reviews: {
        create: [
          { rating: 5, comment: 'Excellent campus and faculty!' },
          { rating: 4, comment: 'Great placements but high workload.' },
        ],
      },
    };
  });
};

async function main() {
  console.log('Start seeding 50+ colleges...');
  const colleges = generateColleges(60);
  
  for (const college of colleges) {
    await prisma.college.upsert({
      where: { slug: college.slug },
      update: {},
      create: college,
    });
    console.log(`Upserted: ${college.name}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
