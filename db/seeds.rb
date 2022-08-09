require "faker"

puts "Seeding Users"

20.times do
  first_name = Faker::Name.first_name
  User.create(
    first_name: first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email(name: first_name),
    password: "123"
  )
end

puts "Seeding Media Types"

MediaType.create(media_type: "book")
MediaType.create(media_type: "movie")
MediaType.create(media_type: "tv show")
MediaType.create(media_type: "comic")
MediaType.create(media_type: "youtube video")
MediaType.create(media_type: "video game")
MediaType.create(media_type: "board game")
MediaType.create(media_type: "blog")

puts "Seeding Creators"

5.times { Creator.create(name: Faker::Name.name) }

puts "Seeding Series"

Series.create(title: "none", rating: 0, media_quantity: 0, season_quantity: 0)

Series.create(
  title: "The Swords of Fate",
  rating: 5,
  media_quantity: 0,
  season_quantity: 0
)

Series.create(
  title: "The Blackest Time of Day",
  rating: 5,
  media_quantity: 0,
  season_quantity: 0
)

Series.create(
  title: "The Most Left Right",
  rating: 5,
  media_quantity: 0,
  season_quantity: 0
)

puts "Seeding Movies"

20.times do |i|
  medium =
    Medium.create(
      title: Faker::Movie.title,
      release_date: Faker::Date.backward(days: 140),
      description: Faker::Lorem.sentence,
      global_rating: 5,
      publisher: "none",
      genre: Faker::Book.genre,
      media_type_id: 2
    )
  user = rand(1..20)
  MediaUser.create(
    rating: 5,
    review: Faker::Lorem.sentence,
    site_consumed: "everywhere",
    consumed: "Not Consumed",
    notes: Faker::Lorem.paragraph,
    user_id: user,
    medium_id: medium.id
  )
  creator = rand(1..5)
  MediaCreator.create(medium_id: medium.id, creator_id: creator)
end

puts "Seeding Book Series"

1.times do |i|
  series_id = i + 2
  number_of_seasons = rand(5..8)
  number_of_seasons.times do |i|
    season =
      Season.create(
        title: "none",
        number: i + 1,
        description: Faker::Lorem.sentence,
        rating: 5,
        media_quantity: 0,
        series_id: series_id
      )
    medium =
      Medium.create(
        title: Faker::Book.title,
        release_date: Faker::Date.backward(days: 140),
        description: Faker::Lorem.sentence,
        global_rating: 5,
        publisher: Faker::Book.publisher,
        genre: Faker::Book.genre,
        media_type_id: 1
      )
    user = rand(1..20)
    MediaUser.create(
      rating: 5,
      review: Faker::Lorem.sentence,
      site_consumed: "everywhere",
      consumed: "Not Consumed",
      notes: Faker::Lorem.paragraph,
      user_id: user,
      medium: medium
    )
    creator = rand(1..5)
    MediaCreator.create(medium: medium, creator_id: creator)
    MediaSeason.create(number: 1, season: season, medium: medium)
  end
end

puts "Seeding tv show Seasons"

2.times do |i|
  series_id = i + 3
  creator = rand(1..5)
  number_of_seasons = rand(5..8)
  number_of_seasons.times do |i|
    season =
      Season.create(
        title: Faker::Appliance.equipment,
        number: i + 1,
        description: Faker::Lorem.sentence,
        rating: 5,
        media_quantity: 0,
        series_id: series_id
      )
    10.times do |i|
      title = Faker::Adjective.positive + " " + Faker::FunnyName.name
      medium =
        Medium.create(
          title: title,
          release_date: Faker::Date.backward(days: 140),
          description: Faker::Lorem.sentence,
          global_rating: 5,
          publisher: "none",
          genre: Faker::Book.genre,
          media_type_id: 3
        )
      user = rand(1..20)
      MediaUser.create(
        rating: 5,
        review: Faker::Lorem.sentence,
        site_consumed: "everywhere",
        consumed: "Not Consumed",
        notes: Faker::Lorem.paragraph,
        user_id: user,
        medium: medium
      )
      MediaCreator.create(medium: medium, creator_id: creator)
      MediaSeason.create(number: i + 1, season: season, medium: medium)
    end
  end
end
