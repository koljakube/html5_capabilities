class GeolocationApiController < Controller

  def availability
  end

  def current_position
  end
  
  def watch_position
  end
  
  def watch_position_transmit
    position = @params[:position]
    error = @params[:error]
    File.open("log/geolocation_api/watch_position.log", "w") do |file|
      file.write(position) unless position.nil?
      file.write(error) unless error.nil?
    end
  end

end