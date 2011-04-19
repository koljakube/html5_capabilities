class Controller
  
  def initialize(params)
    @params = params.inject({}) { |r, (k, v)| r[k.to_sym] = v; r }
  end
  
end
