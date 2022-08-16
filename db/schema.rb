# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_15_165520) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "creators", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "media", force: :cascade do |t|
    t.string "title"
    t.string "release_date"
    t.text "description"
    t.integer "global_rating"
    t.string "publisher"
    t.bigint "media_type_id", null: false
    t.string "genre"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
    t.index ["media_type_id"], name: "index_media_on_media_type_id"
  end

  create_table "media_creators", force: :cascade do |t|
    t.bigint "medium_id", null: false
    t.bigint "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_media_creators_on_creator_id"
    t.index ["medium_id"], name: "index_media_creators_on_medium_id"
  end

  create_table "media_seasons", force: :cascade do |t|
    t.integer "number"
    t.bigint "season_id", null: false
    t.bigint "medium_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medium_id"], name: "index_media_seasons_on_medium_id"
    t.index ["season_id"], name: "index_media_seasons_on_season_id"
  end

  create_table "media_types", force: :cascade do |t|
    t.string "media_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "media_users", force: :cascade do |t|
    t.integer "rating"
    t.text "review"
    t.string "site_consumed"
    t.string "consumed"
    t.text "notes"
    t.bigint "user_id", null: false
    t.bigint "medium_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["medium_id"], name: "index_media_users_on_medium_id"
    t.index ["user_id"], name: "index_media_users_on_user_id"
  end

  create_table "seasons", force: :cascade do |t|
    t.string "title"
    t.integer "number"
    t.text "description"
    t.integer "rating"
    t.bigint "series_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "season_exists"
    t.index ["series_id"], name: "index_seasons_on_series_id"
  end

  create_table "series", force: :cascade do |t|
    t.string "title"
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "media", "media_types"
  add_foreign_key "media_creators", "creators"
  add_foreign_key "media_creators", "media"
  add_foreign_key "media_seasons", "media"
  add_foreign_key "media_seasons", "seasons"
  add_foreign_key "media_users", "media"
  add_foreign_key "media_users", "users"
  add_foreign_key "seasons", "series"
end
