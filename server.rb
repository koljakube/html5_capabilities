#!/usr/bin/env ruby
# -*- encoding: utf-8 -*-

require 'sinatra'
require 'erb'
require 'sass'
require 'coffee-script'


TEST_GROUPS = {
  general: ["General", {
    js_test: "JavaScript Test",
  }],
  capture_api: ["The Capture API", {
    capture: "Capture Interface",
  }],
}


def group_name(group)
  p group
  TEST_GROUPS[group.to_sym][0]
end

def test_name(group, test)
  TEST_GROUPS[group.to_sym][1][test.to_sym]
end
  
before do
  @title = "HTML5 Capability Tests"
  @subtitle = ""
  @show_back_link = false
  @javascripts = %w{
    /jquery/jquery-1.5.2.js
  }
  @stylesheets = []
  
  instance_eval do
    def page_title
      @subtitle != "" ? "#{@title} :: #{@subtitle[1..-2]}" : @title
    end
  end
end


get '/' do
  @test_groups = TEST_GROUPS
  erb :index
end

get '/tests/:group/:test' do |group, test|
  @title, @subtitle = test_name(group, test), "(#{group_name(group)})"
  @show_back_link = true
  @stylesheets << "/stylesheets/#{group}.css"
  @javascripts << "/javascripts/#{group}/#{test}.js"
  erb :"erb/#{group}/#{test}"
end

get '/stylesheets/:file.css' do |file|
  scss :"scss/#{file}"
end

get '/javascripts/:group/:test.js' do |group, test|
  coffee :"coffee-script/#{group}/#{test}"
end
  