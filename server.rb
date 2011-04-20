#!/usr/bin/env ruby
# -*- encoding: utf-8 -*-

require 'sinatra'
require 'sinatra/reloader' if development?
require 'erb'
require 'sass'
require 'coffee-script'

require_relative 'lib/all'

require_relative 'lib/routes'


def group_name(group)
  ROUTES[group.to_sym][0]
end

def test_name(group, test)
  ROUTES[group.to_sym][1][test.to_sym]
end


before do
  @title = "HTML5 Capability Tests"
  @subtitle = ""
  @show_back_link = false
  @javascripts = %w{
    /jquery/jquery-1.5.2.js
    /jquery/jquery.json-2.2.js
    /javascripts/common.js
  }
  @stylesheets = []
  @iphone = false
  
  instance_eval do
    def page_title
      @subtitle != "" ? "#{@title} :: #{@subtitle[1..-2]}" : @title
    end
  end
end


get '/', :agent => /(.*)/ do
  @iphone = true if /iPhone/.match params[:agent].first
  @test_groups = ROUTES
  erb :"erb/index"
end

get '/tests/:group/:test', :agent => /(.*)/ do |group, test|
  require_relative("controllers/#{group}_controller")
  @controller = Object.const_get("#{group.camelcase}Controller").new(params)
  @iphone = true if /iPhone/.match params[:agent].first
  @title, @subtitle = test_name(group, test), "(#{group_name(group)})"
  @show_back_link = true
  @stylesheets << "/stylesheets/#{group}.css"
  @javascripts << "/javascripts/#{group}/#{test}.js"
  # TODO: How to instance eval methods by name?
  @controller.send test if @controller.respond_to? test.to_sym
  @controller.instance_variables.each do |var|
    self.instance_variable_set(var, @controller.instance_variable_get(var))
  end
  erb :"erb/#{group}/#{test}"
end

post '/tests/:group/:test', :agent => /(.*)/ do |group, test|
  require_relative("controllers/#{group}_controller")
  @controller = Object.const_get("#{group.camelcase}Controller").new(params)
  @iphone = true if /iPhone/.match params[:agent].first
  @title, @subtitle = test_name(group, test), "(#{group_name(group)})"
  @show_back_link = true
  @stylesheets << "/stylesheets/#{group}.css"
  @javascripts << "/javascripts/#{group}/#{test}.js"
  # TODO: How to instance eval methods by name?
  @controller.send test if @controller.respond_to? test.to_sym
  @controller.instance_variables.each do |var|
    self.instance_variable_set(var, @controller.instance_variable_get(var))
  end
  erb :"erb/#{group}/#{test}"
end

get '/stylesheets/:file.css' do |file|
  scss :"scss/#{file}"
end

get '/javascripts/:file.js' do |file|
  coffee :"coffee-script/#{file}"
end
get '/javascripts/:group/:test.js' do |group, test|
  coffee :"coffee-script/#{group}/#{test}"
end
  