require 'fileutils'


desc "Run the server"
task :run do
  system("./server.rb")
end

desc "Open a browser and point it to the server (OS X only)"
task :browse do
  system("open http://0.0.0.0:4567/")
end

desc "Create all the files necesarry for a new test"
task :generate, :group, :test do |t, args|
  group = args[:group] || ""
  test  = args[:test]  || ""
  if group == "" or test == ""
    abort "You need to specify a group and a test name."
    return
  end
  directories = [
    "log/#{group}",
    "views/erb/#{group}",
    "views/coffee-script/#{group}",
  ]
  files = [
    "controllers/#{group}_controller.rb",
    "views/erb/#{group}/#{test}.erb",
    "views/coffee-script/#{group}/#{test}.coffee",
    "views/scss/#{group}.scss"
  ]
  directories.each do |dir|
    Dir.mkdir dir if not File.exists? dir
  end
  files.each do |file|
    File.open(file, "w").close if not File.exists? file
  end
end

desc "Archive all log files and remove them"
task :clean_logs do
  Dir.chdir(File.dirname(__FILE__))
  Dir.chdir('log')
  dirs = (Dir['*'] - %w{backups}).join ' '
  system("tar -cjf backups/log-backup-#{Time.now.strftime("%Y%m%d%H%M%S")}.tar.bz2 #{dirs}")
  Dir['*/*.log'].each do |file|
    File.unlink file
  end
end

desc "Compile all CoffeeScript files into static files"
task :compile_coffeescript do
  ["views/coffee-script/*.coffee", "views/coffee-script/*/*.coffee"].each do |dir|
    Dir[dir].each do |file|
      outdir = File.dirname(file.sub("views/coffee-script", "public/javascripts_static"))
      system("coffee -o #{outdir} #{file}")
    end
  end
end

task :default do
  system("sleep 1 && open http://0.0.0.0:4567 &")
  system("./server.rb")
end