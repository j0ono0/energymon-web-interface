# energymon-web-interface
Web interface tailored for ['Whatnick's'](https://github.com/whatnick) (Tisham Dhar's) energy monitor hardware.
Interface allows end users to configure device hardware and software.
Configuration Interfaces:
- Network connections
- Data logging service
- Hardware sensor fine tuning
- Firmware updates

This repo includes multiple versions of the site - all works-in-progress and in various states of completeness. 
multiple versions were created as different hardware/platform options were considered and tested.

## src folder
Contains a Vuejs version of the site and master CSS (SCSS) files.

## flask folder
Python based version of the site. This was created as an interim site with the view of porting files to a picoweb version 
(A method of developing for picoweb in PC was unknown to me at that point in time).

## picoweb
Installing Ununtu on windows allowed a Unix version of picoweb to be used for continued development.
This version, which runs on Micropython, is currently the version under continued development.
*NOTE:* picoweb development has been moved to its own repository https://github.com/j0ono0/DIN_Wemos_ATM90E26_upy 
