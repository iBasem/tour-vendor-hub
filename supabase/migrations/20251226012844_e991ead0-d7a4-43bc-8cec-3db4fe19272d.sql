-- Insert packages (12 total - 4 featured, 8 regular) with valid UUIDs
INSERT INTO public.packages (id, agency_id, title, description, destination, base_price, duration_days, duration_nights, category, difficulty_level, status, featured, max_participants, inclusions, exclusions, available_from, available_to)
VALUES 
  -- Featured Packages
  ('11111111-1111-4111-8111-111111111111', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Arabian Desert Safari Adventure', 'Experience the magic of the Arabian desert with this unforgettable 5-day safari. Ride camels across golden dunes, sleep under the stars in luxury Bedouin camps, and discover ancient oases.', 'Saudi Arabia', 1299, 5, 4, 'adventure', 'moderate', 'published', true, 16, ARRAY['Luxury desert camping', 'All meals included', 'Camel riding', 'Professional guide', '4x4 desert transport', 'Traditional entertainment'], ARRAY['International flights', 'Travel insurance', 'Personal expenses', 'Visa fees'], '2025-01-01', '2025-12-31'),
  
  ('22222222-2222-4222-8222-222222222222', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'Rocky Mountain Explorer', 'Conquer the majestic Rocky Mountains on this thrilling 7-day adventure. Trek through alpine meadows, summit breathtaking peaks, and witness wildlife in their natural habitat.', 'Colorado, USA', 2199, 7, 6, 'adventure', 'challenging', 'published', true, 12, ARRAY['Mountain lodge accommodation', 'All meals', 'Professional mountaineering guide', 'Climbing equipment', 'Park permits', 'Emergency satellite phone'], ARRAY['Flights to Denver', 'Travel insurance', 'Personal climbing gear', 'Gratuities'], '2025-06-01', '2025-09-30'),
  
  ('33333333-3333-4333-8333-333333333333', 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Mediterranean Coastal Voyage', 'Sail the stunning Mediterranean coastline on this luxurious 10-day voyage. Visit charming fishing villages, swim in crystal-clear coves, and savor the finest coastal cuisine.', 'Portugal & Spain', 3499, 10, 9, 'luxury', 'easy', 'published', true, 20, ARRAY['Luxury yacht accommodation', 'Gourmet meals', 'Wine tastings', 'Guided coastal excursions', 'Water sports equipment', 'Onboard chef'], ARRAY['Flights', 'Travel insurance', 'Personal expenses', 'Premium alcohol'], '2025-05-01', '2025-10-31'),
  
  ('44444444-4444-4444-8444-444444444444', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Ancient Petra Discovery', 'Walk in the footsteps of ancient civilizations on this 6-day journey through Jordan. Explore the rose-red city of Petra, float in the Dead Sea, and camp in Wadi Rum.', 'Jordan', 1799, 6, 5, 'cultural', 'moderate', 'published', true, 18, ARRAY['Boutique hotel stays', 'All meals', 'Expert archaeologist guide', 'Petra entrance fees', 'Dead Sea resort access', 'Wadi Rum jeep tour'], ARRAY['International flights', 'Jordan visa', 'Travel insurance', 'Personal souvenirs'], '2025-03-01', '2025-11-30'),

  -- Regular Packages
  ('55555555-5555-4555-8555-555555555555', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'Yellowstone Wildlife Safari', 'Discover the wonders of Yellowstone on this 4-day wildlife safari. Spot bison, wolves, and bears while exploring geysers and hot springs.', 'Wyoming, USA', 1099, 4, 3, 'nature', 'easy', 'published', false, 14, ARRAY['Lodge accommodation', 'All meals', 'Wildlife guide', 'Park entrance fees', 'Binoculars rental'], ARRAY['Flights', 'Travel insurance', 'Personal items'], '2025-05-01', '2025-10-31'),
  
  ('66666666-6666-4666-8666-666666666666', 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Greek Islands Hopping', 'Island hop through the stunning Cyclades on this 8-day adventure. Visit Santorini, Mykonos, and Paros while enjoying Greek hospitality.', 'Greece', 2299, 8, 7, 'beach', 'easy', 'published', false, 16, ARRAY['Boutique hotel stays', 'Ferry tickets', 'Breakfast daily', 'Island tours', 'Wine tasting'], ARRAY['Flights', 'Lunch and dinner', 'Travel insurance'], '2025-05-01', '2025-10-15'),
  
  ('77777777-7777-4777-8777-777777777777', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Dubai City Experience', 'Experience the glamour of Dubai on this 4-day city tour. Visit iconic landmarks, shop in world-class malls, and enjoy desert activities.', 'United Arab Emirates', 899, 4, 3, 'cultural', 'easy', 'published', false, 20, ARRAY['5-star hotel', 'Breakfast', 'City tour', 'Burj Khalifa tickets', 'Desert safari'], ARRAY['Flights', 'Lunch and dinner', 'Personal shopping'], '2025-01-01', '2025-12-31'),
  
  ('88888888-8888-4888-8888-888888888888', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'Grand Canyon Adventure', 'Explore one of the world''s natural wonders on this 3-day Grand Canyon adventure with hiking and rafting.', 'Arizona, USA', 799, 3, 2, 'adventure', 'moderate', 'published', false, 12, ARRAY['Camping equipment', 'All meals', 'Rafting gear', 'Park permits', 'Guide services'], ARRAY['Flights to Phoenix', 'Travel insurance', 'Personal items'], '2025-04-01', '2025-10-31'),
  
  ('99999999-9999-4999-8999-999999999999', 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Amalfi Coast Retreat', 'Relax on the stunning Amalfi Coast during this 5-day luxury retreat with gourmet dining and private boat tours.', 'Italy', 2799, 5, 4, 'luxury', 'easy', 'published', false, 10, ARRAY['Luxury hotel', 'Breakfast and dinner', 'Private boat tour', 'Wine tasting', 'Cooking class'], ARRAY['Flights', 'Lunch', 'Personal expenses'], '2025-05-01', '2025-09-30'),
  
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Egyptian Pyramids Tour', 'Discover ancient Egypt on this 7-day tour featuring the Pyramids of Giza, Luxor temples, and a Nile cruise.', 'Egypt', 1599, 7, 6, 'cultural', 'easy', 'published', false, 20, ARRAY['4-star hotels', 'All meals', 'Nile cruise cabin', 'Egyptologist guide', 'All entrance fees'], ARRAY['International flights', 'Egypt visa', 'Travel insurance', 'Tips'], '2025-01-01', '2025-12-31'),
  
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'Alaska Glacier Expedition', 'Witness the majesty of Alaskan glaciers on this 6-day expedition with kayaking and wildlife viewing.', 'Alaska, USA', 2499, 6, 5, 'nature', 'moderate', 'published', false, 10, ARRAY['Lodge and camping', 'All meals', 'Kayaking equipment', 'Expert naturalist guide', 'Glacier hike gear'], ARRAY['Flights to Anchorage', 'Travel insurance', 'Cold weather gear'], '2025-06-01', '2025-09-15'),
  
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Moroccan Desert & Cities', 'Experience the magic of Morocco with this 8-day journey from Marrakech to the Sahara Desert.', 'Morocco', 1399, 8, 7, 'cultural', 'moderate', 'published', false, 14, ARRAY['Riad accommodation', 'Breakfast and dinner', 'Desert camping', 'Camel trek', 'Local guides'], ARRAY['Flights', 'Lunch', 'Travel insurance', 'Tips'], '2025-03-01', '2025-11-30')
ON CONFLICT (id) DO NOTHING;

-- Insert package media for all packages
INSERT INTO public.package_media (package_id, file_path, file_name, media_type, is_primary, display_order)
VALUES 
  ('11111111-1111-4111-8111-111111111111', 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1200', 'arabian-desert-1.jpg', 'image', true, 1),
  ('11111111-1111-4111-8111-111111111111', 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200', 'arabian-desert-2.jpg', 'image', false, 2),
  ('22222222-2222-4222-8222-222222222222', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200', 'rocky-mountains-1.jpg', 'image', true, 1),
  ('22222222-2222-4222-8222-222222222222', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200', 'rocky-mountains-2.jpg', 'image', false, 2),
  ('33333333-3333-4333-8333-333333333333', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200', 'mediterranean-1.jpg', 'image', true, 1),
  ('33333333-3333-4333-8333-333333333333', 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200', 'mediterranean-2.jpg', 'image', false, 2),
  ('44444444-4444-4444-8444-444444444444', 'https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=1200', 'petra-1.jpg', 'image', true, 1),
  ('44444444-4444-4444-8444-444444444444', 'https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=1200', 'petra-2.jpg', 'image', false, 2),
  ('55555555-5555-4555-8555-555555555555', 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=1200', 'yellowstone-1.jpg', 'image', true, 1),
  ('66666666-6666-4666-8666-666666666666', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200', 'greek-islands-1.jpg', 'image', true, 1),
  ('77777777-7777-4777-8777-777777777777', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 'dubai-1.jpg', 'image', true, 1),
  ('88888888-8888-4888-8888-888888888888', 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=1200', 'grand-canyon-1.jpg', 'image', true, 1),
  ('99999999-9999-4999-8999-999999999999', 'https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=1200', 'amalfi-1.jpg', 'image', true, 1),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=1200', 'egypt-1.jpg', 'image', true, 1),
  ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200', 'alaska-1.jpg', 'image', true, 1),
  ('cccccccc-cccc-4ccc-8ccc-cccccccccccc', 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200', 'morocco-1.jpg', 'image', true, 1)
ON CONFLICT DO NOTHING;

-- Insert itineraries for featured packages
INSERT INTO public.itineraries (package_id, day_number, title, description, activities, meals_included, accommodation, transportation)
VALUES 
  ('11111111-1111-4111-8111-111111111111', 1, 'Arrival & Desert Welcome', 'Arrive in Riyadh and transfer to our desert base camp.', ARRAY['Airport pickup', 'Desert camp check-in', 'Welcome ceremony', 'Traditional dinner'], ARRAY['Dinner'], 'Luxury Desert Camp', '4x4 SUV'),
  ('11111111-1111-4111-8111-111111111111', 2, 'Dune Adventure', 'Full day of dune bashing and camel riding.', ARRAY['Dune bashing', 'Camel riding', 'Sandboarding', 'Sunset photography'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Desert Camp', '4x4 SUV'),
  ('11111111-1111-4111-8111-111111111111', 3, 'Oasis Exploration', 'Visit hidden oases and learn about desert survival.', ARRAY['Oasis visit', 'Bedouin culture', 'Traditional crafts', 'Stargazing'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Bedouin Tent', 'Camel & 4x4'),
  ('11111111-1111-4111-8111-111111111111', 4, 'Desert Sports Day', 'Experience quad biking and falconry.', ARRAY['Quad biking', 'Falconry show', 'Traditional games', 'BBQ dinner'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Desert Camp', '4x4 SUV'),
  ('11111111-1111-4111-8111-111111111111', 5, 'Departure', 'Farewell breakfast and transfer to airport.', ARRAY['Breakfast', 'Souvenir shopping', 'Airport transfer'], ARRAY['Breakfast'], 'N/A', '4x4 SUV'),
  
  ('22222222-2222-4222-8222-222222222222', 1, 'Denver Arrival', 'Arrive in Denver and transfer to mountain lodge.', ARRAY['Airport pickup', 'Lodge check-in', 'Equipment fitting', 'Welcome dinner'], ARRAY['Dinner'], 'Mountain Lodge', 'Van'),
  ('22222222-2222-4222-8222-222222222222', 2, 'Acclimatization Hike', 'Easy hike to acclimatize to altitude.', ARRAY['Valley hike', 'Wildlife spotting', 'Photography', 'Trail lunch'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Mountain Lodge', 'Hiking'),
  ('22222222-2222-4222-8222-222222222222', 3, 'Alpine Meadows Trek', 'Trek through wildflower meadows.', ARRAY['Alpine meadow trek', 'Stream crossing', 'Picnic lunch'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Backcountry Camp', 'Hiking'),
  ('22222222-2222-4222-8222-222222222222', 4, 'Summit Day', 'Summit attempt on a 14,000ft peak.', ARRAY['Early start', 'Summit climb', 'Peak celebration', 'Descent'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Backcountry Camp', 'Hiking'),
  ('22222222-2222-4222-8222-222222222222', 5, 'Lake Basin Exploration', 'Explore pristine alpine lakes.', ARRAY['Lake hiking', 'Fishing', 'Wildlife watching'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Lakeside Camp', 'Hiking'),
  ('22222222-2222-4222-8222-222222222222', 6, 'Return to Lodge', 'Scenic hike back to the lodge.', ARRAY['Descent hike', 'Hot springs visit', 'Celebration dinner'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Mountain Lodge', 'Hiking'),
  ('22222222-2222-4222-8222-222222222222', 7, 'Departure', 'Farewell breakfast and airport transfer.', ARRAY['Breakfast', 'Certificate ceremony', 'Airport transfer'], ARRAY['Breakfast'], 'N/A', 'Van'),
  
  ('33333333-3333-4333-8333-333333333333', 1, 'Lisbon Embarkation', 'Board our luxury yacht in Lisbon harbor.', ARRAY['Yacht boarding', 'Safety briefing', 'Harbor cruise', 'Gala dinner'], ARRAY['Dinner'], 'Luxury Yacht', 'Yacht'),
  ('33333333-3333-4333-8333-333333333333', 2, 'Cascais & Sintra', 'Explore Cascais and fairytale Sintra.', ARRAY['Cascais walking tour', 'Sintra palace', 'Wine tasting'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Yacht', 'Yacht & Van'),
  ('33333333-3333-4333-8333-333333333333', 3, 'Sailing to Algarve', 'Full day sailing along the Portuguese coast.', ARRAY['Sailing', 'Swimming stops', 'Dolphin watching'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Luxury Yacht', 'Yacht'),
  
  ('44444444-4444-4444-8444-444444444444', 1, 'Amman Arrival', 'Arrive in Amman and explore the Citadel.', ARRAY['Airport pickup', 'Citadel tour', 'Roman Theater', 'Welcome dinner'], ARRAY['Dinner'], 'Boutique Hotel Amman', 'Private Car'),
  ('44444444-4444-4444-8444-444444444444', 2, 'Journey to Petra', 'Drive the Kings Highway to Petra.', ARRAY['Kings Highway drive', 'Kerak Castle', 'Shobak Castle'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Petra Guest House', 'Private Car'),
  ('44444444-4444-4444-8444-444444444444', 3, 'Petra Full Day', 'Full day exploring Petra.', ARRAY['Treasury', 'Street of Facades', 'Royal Tombs', 'Monastery hike'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Petra Guest House', 'Walking'),
  ('44444444-4444-4444-8444-444444444444', 4, 'Wadi Rum', 'Journey to Wadi Rum desert.', ARRAY['Wadi Rum jeep tour', 'Desert sunset', 'Bedouin camp'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Wadi Rum Camp', 'Jeep'),
  ('44444444-4444-4444-8444-444444444444', 5, 'Dead Sea', 'Day of floating and spa treatments.', ARRAY['Dead Sea float', 'Mud treatment', 'Spa session'], ARRAY['Breakfast', 'Lunch', 'Dinner'], 'Dead Sea Resort', 'Private Car'),
  ('44444444-4444-4444-8444-444444444444', 6, 'Departure', 'Morning and transfer to airport.', ARRAY['Breakfast', 'Souvenir shopping', 'Airport transfer'], ARRAY['Breakfast'], 'N/A', 'Private Car')
ON CONFLICT DO NOTHING;