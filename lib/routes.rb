ROUTES = {
  general: ["General", {
    js_test: "JavaScript test",
    user_agent: "Submit user agent",
  }],
  orientation: ["Device Orientation", {
    display: "Display orientation",
    accelerometer: "Display accelerometer data"
  }],
  file_api: ['File API', {
    filelist: "FileList + FileReader",
    filereadersync: "FileList + FileReaderSync",
  }],
  capture_api: ["Capture API", {
    device_availability: "Device availability",
    supported_formats: "Supported formats",
    inputs: "Try out media inputs",
  }],
  web_storage: ["WebStorage", {
    info: "WebStorage Information",
    session: "Session Storage",
    local: "Local Storage",
    storage_event: "Storage Event",
  }],
  offline: ["Offline Apps", {
    check: "Check status",
  }],
  geolocation_api: ["Geolocation API", {
    availability: "Show availability",
    current_position: "Get current position",
    watch_position: "Watch position",
  }],
  workers: ["Web Workers", {
    availability: "Show availability",
    prime: "Calculate prime numbers",
    prime_hardcore: "Busily calculate prime numbers",
  }],
  contacts_api: ["Contacts API", {
    search: "Search contacts",
  }],
  web_socket_api: ["WebSocket API", {
    ping: "Ping server",
  }],
}
