class GeolocationApiController < Controller

  def availability
  end

  def current_position
  end
  
  def watch_position
  end
  
  def watch_position_transmit
    puts @params
    position = @params[:position]
    error = @params[:error]
    File.open("log/geolocation_api/watch_position.log", "a") do |file|
      file.write(position + "\n\n") unless position.nil?
      file.write(error + "\n\n") unless error.nil?
    end
  end

end