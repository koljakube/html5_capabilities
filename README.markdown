HTML5 Capability Tests
======================

A collection of tests designed to be used to test device capabilities offered
by modern browsers. Shall be used to show the differences in capabilities
between native and web applications for mobile devices.


Installation
------------

Just check out the repository and use the included rake task to start the
Sinatra server.

    git clone git://github.com/koljakube/html5_capabilities.git
    cd html5_capabilities
    rake

Use `rake run` if you are not on an OS X machine.


Logging
-------

After running a series of tests on a device, you can archive the generated log
files (not all tests generate them) by running

    rake clean_logs
    
This will create a timestamped backup archive of all existing logs.