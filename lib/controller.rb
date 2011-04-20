class Controller
  
  def initialize(params)
    @params = params.inject({}) { |r, (k, v)| r[k.to_sym] = v; r }
    p @params
  end
  
  def log
    group = @params[:group]
    test = @params[:test].sub('_submit', '')
    File.open("log/#{group}/#{test}.log", "a") do |file|
      file.write("agent    = " + @params[:agent].first + "\n")
      old_stdout, $stdout = $stdout, file
      yield
      $stdout = old_stdout
      file.write("\n")
    end
  end
  
end
