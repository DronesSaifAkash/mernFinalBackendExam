
1. Fetch All Train Info
   - Method: `GET`
   - URL: `http://localhost:5000/api/trains`
   - Response: Should return all train records.

2. Find Specific Train Info
   - Method: `GET`
   - URL: `http://localhost:5000/api/trains/search?src_station=XYZ&dest_station=ABC`
   - Response: Should return trains matching the specified source and destination stations.

3. Insert Train Info
   - Method: `POST`
   - URL: `http://localhost:5000/api/trains`
   - Body (JSON):
     {
         "train_no": "12345",
         "train_name": "Express Train",
         "src_station": "Station A",
         "dest_station": "Station B",
         "platform_no": "1",
         "dep_time": "10:00",
         "arr_time": "14:00"
     }
   - Response: Should return the newly created train record.

4. Update Train Info
   - Method: `PUT`
   - URL: `http://localhost:5000/api/trains/12345`
   - Body (JSON):
     {
         "train_name": "Super Express",
         "platform_no": "2"
     }
   - Response: Should return the updated train record.

5. Delete Train Info
   - Method: `DELETE`
   - URL: `http://localhost:5000/api/trains/60f0c2e5a47e6c1a88e00000`
   - Response: Should confirm the deletion.
