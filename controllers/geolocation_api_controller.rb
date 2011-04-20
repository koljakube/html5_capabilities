class GeolocationApiController < Controller

  def availability
  end

  def current_position
  end
  
  def current_position_submit
    log do
      puts "options  = #{@params[:positionOptions]}"
      puts "position = #{@params[:position]}" unless @params[:position].nil?
      puts "error    = #{@params[:error]}" unless @params[:error].nil?
    end
  end
  
  def watch_position
  end
  
  def watch_position_submit
    log do
      puts "options  = #{@params[:positionOptions]}"
      puts "position = #{@params[:position]}" unless @params[:position].nil?
      puts "error    = #{@params[:error]}" unless @params[:error].nil?
    end
  end

end