require 'rubygems'
require 'sinatra'
require 'data_mapper'
require 'json'

##################
# Database setup #
##################
DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/app.db")

##########
# Models #
##########
class Category
  include DataMapper::Resource

  property :id, Serial
  property :name, String

  has n, :templates
end

class Template
  include DataMapper::Resource

  property :id, Serial
  property :name, String
  property :body, String

  belongs_to :category
end

DataMapper.finalize
Category.auto_upgrade!
Template.auto_upgrade!

##########
# Routes #
##########

# Root route (lol)
get '/' do
  File.read(File.join('public', 'index.html'))
end

# Categories#index
get '/categories/?' do
  Category.all.to_json
end

# Categories#show
get '/categories/:id/?' do
  Category.get(params[:id]).to_json
end

# Categories#create
post '/categories/?' do
  Category.create(JSON.parse(request.body.read)).to_json
end

# Categories#update
put '/categories/:id/?' do
  Category.get(params[:id]).tap { |c| c.update(JSON.parse(request.body.read)) }.to_json
end

# Categories#destroy
delete '/categories/:id/?' do
  Category.get(params[:id]).destroy
end

# Templates#index
get '/categories/:category_id/templates/?' do
  Category.get(params[:category_id]).templates.to_json
end

# Templates#show
get '/categories/:category_id/templates/:id/?' do
 Category.get(params[:category_id]).templates.get(params[:id]).to_json
end

# Templates#create
post '/categories/:category_id/templates/?' do
  Category.get(params[:category_id]).templates.create(JSON.parse(request.body.read)).to_json
end

# Templates#update
put '/categories/:category_id/templates/:id/?' do
  Category.get(params[:category_id]).templates.get(params[:id]).tap { |t| t.update(JSON.parse(request.body.read)) }.to_json
end

# Templates#destroy
delete '/categories/:category_id/templates/:id/?' do
  Category.get(params[:category_id]).templates.get(params[:id]).destroy
end
