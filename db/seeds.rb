require "faker"

#################################################################### Main Seed
# puts "Seeding Users"

# 5.times do
#   first_name = Faker::Name.first_name
#   User.create(
#     first_name: first_name,
#     last_name: Faker::Name.last_name,
#     email: Faker::Internet.email(name: first_name),
#     password: "123"
#   )
# end

# puts "Seeding Media Types"

# MediaType.create(media_type: "book")
# MediaType.create(media_type: "movie")
# MediaType.create(media_type: "tv show")
# MediaType.create(media_type: "comic")
# MediaType.create(media_type: "youtube video")
# MediaType.create(media_type: "video game")
# MediaType.create(media_type: "board game")
# MediaType.create(media_type: "blog")

# puts "Seeding Creators"

# 5.times { Creator.create(name: Faker::Name.name) }

# puts "Seeding Series"

# Series.create(title: "none", rating: 0)

# Series.create(title: "The Swords of Fate", rating: 5)

# Series.create(title: "The Blackest Time of Day", rating: 5)

# Series.create(title: "The Most Left Right", rating: 5)

# puts "Seeding Movies"

# 20.times do |i|
#   medium =
#     Medium.create(
#       title: Faker::Movie.title,
#       release_date: Faker::Date.backward(days: 140),
#       description: Faker::Lorem.sentence,
#       global_rating: 5,
#       publisher: "none",
#       genre: Faker::Book.genre,
#       media_type_id: 2,
#       image: ""
#     )
#   user = rand(1..20)
#   MediaUser.create(
#     rating: 5,
#     review: Faker::Lorem.sentence,
#     site_consumed: "everywhere",
#     consumed: "not consumed",
#     notes: Faker::Lorem.paragraph,
#     user_id: user,
#     medium_id: medium.id
#   )
#   creator = rand(1..5)
#   MediaCreator.create(medium_id: medium.id, creator_id: creator)
# end

# puts "Seeding Book Series"

# 1.times do |i|
#   series_id = i + 2
#   number_of_seasons = rand(5..8)
#   number_of_seasons.times do |i|
#     season =
#       Season.create(
#         title: "none",
#         number: i + 1,
#         description: Faker::Lorem.sentence,
#         rating: 5,
#         series_id: series_id,
#         season_exists: false
#       )
#     medium =
#       Medium.create(
#         title: Faker::Book.title,
#         release_date: Faker::Date.backward(days: 140),
#         description: Faker::Lorem.sentence,
#         global_rating: 5,
#         publisher: Faker::Book.publisher,
#         genre: Faker::Book.genre,
#         media_type_id: 1,
#         image: ""
#       )
#     user = rand(1..20)
#     MediaUser.create(
#       rating: 5,
#       review: Faker::Lorem.sentence,
#       site_consumed: "everywhere",
#       consumed: "not consumed",
#       notes: Faker::Lorem.paragraph,
#       user_id: user,
#       medium_id: medium.id
#     )
#     creator = rand(1..5)
#     MediaCreator.create(medium: medium, creator_id: creator)
#     MediaSeason.create(number: 1, season: season, medium: medium)
#   end
# end

# puts "Seeding tv show Seasons"

# 2.times do |i|
#   series_id = i + 3
#   creator = rand(1..5)
#   number_of_seasons = rand(5..8)
#   number_of_seasons.times do |i|
#     season =
#       Season.create(
#         title: Faker::Appliance.equipment,
#         number: i + 1,
#         description: Faker::Lorem.sentence,
#         rating: 5,
#         series_id: series_id,
#         season_exists: true
#       )
#     10.times do |i|
#       title = Faker::Adjective.positive + " " + Faker::FunnyName.name
#       medium =
#         Medium.create(
#           title: title,
#           release_date: Faker::Date.backward(days: 140),
#           description: Faker::Lorem.sentence,
#           global_rating: 5,
#           publisher: "none",
#           genre: Faker::Book.genre,
#           media_type_id: 3,
#           image: ""
#         )
#       user = rand(1..20)
#       MediaUser.create(
#         rating: 5,
#         review: Faker::Lorem.sentence,
#         site_consumed: "everywhere",
#         consumed: "not consumed",
#         notes: Faker::Lorem.paragraph,
#         user_id: user,
#         medium_id: medium.id
#       )
#       MediaCreator.create(medium_id: medium.id, creator_id: creator)
#       MediaSeason.create(number: i + 1, season: season, medium_id: medium.id)
#     end
#   end
# end

##################################################################################### Grab data from APIs

puts "Seeding Users"

user =
  User.create(
    first_name: "Admin",
    last_name: "Administrator",
    email: "admin@admin.com",
    password: "123"
  )

User.create(
  first_name: "asdf",
  last_name: "asdf",
  email: "asdf@asdf.com",
  password: "123"
)

puts "Seeding Media Types"

MediaType.create(media_type: "book")
MediaType.create(media_type: "movie")
MediaType.create(media_type: "tv show")
MediaType.create(media_type: "comic")
MediaType.create(media_type: "youtube video")
MediaType.create(media_type: "video game")
MediaType.create(media_type: "board game")
MediaType.create(media_type: "blog")
MediaType.create(media_type: "magazine")

#### Get first id for title matching search term

backup_database_responses = ExternalApi.budb_get_all
backup_database_responses.map do |response|
  if response["api"] == "imdb"
    params_hash =
      ExternalApi.convert_imdb_response_to_params_hash(
        eval(response["response"]),
        response["title_id"]
      )
  elsif response["api"] == "google_books"
    params_hash =
      ExternalApi.convert_google_books_response_to_params_hash(
        eval(response["response"]),
        response["title_id"]
      )
  end
  Medium.create_media_and_related_objects_without_exceptions(params_hash, user)
end
