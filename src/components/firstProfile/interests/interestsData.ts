interface InterestData {
  title: string
  item: string[]
  multiple?: boolean
}

export const interestsData: InterestData[] = [
  {
    title: 'Smoking',
    item: ['Social Smoking', 'Occasional Smoking', 'Smoker', 'Non-Smoker'],
  },
  {
    title: 'Educational Level',
    item: [
      'High School',
      'Associate Degrees',
      'College Diploma',
      "Master's Degrees",
      'Doctoral Degrees',
      "Bachelor's Degrees",
      'Postgraduate Degrees',
      'Undergraduate Degrees',
    ],
    multiple: true,
  },
  {
    title: 'Children',
    item: [
      'None',
      '1 Child',
      '2 Children',
      '3 Children',
      '4 Children',
      '5 Or More',
      'Twins',
      'Triplets',
    ],
  },
  {
    title: 'Drinking',
    item: [
      'Never',
      'Less than monthly',
      'Monthly',
      'Weekly',
      'Daily or almost daily',
      'Occasionally',
    ],
  },
  {
    title: 'Pets',
    item: [
      'None',
      '1 Dog',
      '2 Dogs',
      '3 Dogs',
      'Fish',
      'Cat',
      '2 Cats',
      '3 Cats',
      'Birds',
      'Reptile',
      'Hamster/Guinea Pig/Gerbil',
      'Other',
    ],
    multiple: true,
  },
  {
    title: 'Interests',
    item: [
      'Hiking',
      'Cooking',
      'Movies',
      'Reading',
      'Traveling',
      'Sports (specify specific sports, e.g., basketball, soccer, tennis)',
      'Music',
      'Art&Painting',
      'Photography',
      'Yoga',
      'Fitness',
      'Dancing',
      'Foodie',
      'Outdoor Adventures',
      'Gaming',
      'Fashion',
      'Volunteering',
      'Nature&Wildlife',
      'Science',
      'Technology',
      'Pets',
      'Writing',
      'Gardening',
      'Wine Tasting',
      'Craftsmanship',
      'Meditation',
      'Languages',
      'Astronomy',
      'Space',
      'History',
      'DIY',
      'Home Improvement',
      'Stand-up',
      'Cars',
      'Theater',
      'Cooking Shows',
      'Makeup&Beauty',
      'Board Games',
      'Astronomy',
      'Crafts',
      'Fashion Design',
      'Travel Photography',
      'Astrology',
      'Horoscopes',
      'Collectibles',
      'Running',
      'Meditation',
      'Mindfulness',
      'Home Decor',
      'Water Sports',
      'Education',
      'Mindful Eating',
      'Paranormal',
      'Film Making',
    ],
    multiple: true,
  },
]
