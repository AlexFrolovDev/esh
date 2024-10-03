Installation & setup:

Open terminal in project's directory.
Run "yarn" or "npm install"
Run "yarn dev" or "npm run dev"

Open browser in localhost with designated port.

App's logic could've been implemented in many various ways.
SearchPage route defined under protected route for presentation only, all the pages could been protected.
Api requests and data storage/mutation could been managed inside Context entirely, i chose mixed approach and Context holds api object only.

Character form has no validations, field types etc.

Characters table could display other fields with multiple values represented as list of links. In this case we could load all these cell values asyncronously per row right after table display or load all the data and only then diplay table. First(async) version is preferred, we would need to schedule and orchestrate requests to API for every cell with multiple links and run these requests in sequence(Vehicles example: Row_1[vehicle_1_url, vehicle_2_url, vehicle_3_url] -> success -> Row_2[vehicle_1_url, ....])
