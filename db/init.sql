-- Wait for Hibernate to create the foods table, then seed it.
-- Docker entrypoint runs this after postgres is ready.

DO $$
BEGIN
  -- Only seed if the table is empty
  IF (SELECT COUNT(*) FROM foods) = 0 THEN

      INSERT INTO foods (name, brand, calories, protein, carbohydrates, fat, fiber, sugar, sodium, serving_size, serving_calories)
      VALUES
          ('Chicken Breast (cooked)', NULL,        165,  31.0,  0.0,  3.6, 0.0,  0.0, 74,  '100g', 165),
          ('Brown Rice (cooked)',     NULL,         216,   4.5, 45.0,  1.8, 3.5,  0.4, 10,  '100g', 216),
          ('Banana',                  NULL,          89,   1.1, 23.0,  0.3, 2.6, 12.2,  1,  '100g',  89),
          ('Greek Yogurt',            'Chobani',     59,  10.0,  3.6,  0.4, 0.0,  3.2, 36,  '100g',  59),
          ('Whole Egg',               NULL,         143,  13.0,  1.1,  9.5, 0.0,  1.1, 142, '100g', 143),
          ('Avocado',                 NULL,         160,   2.0,  9.0, 15.0, 7.0,  0.7,   7, '100g', 160),
          ('Rolled Oats',             NULL,         389,  17.0, 66.0,  7.0, 11.0, 1.1,   2, '100g', 389),
          ('Almonds',                 NULL,         579,  21.0, 22.0, 50.0, 12.5, 4.4,   1, '100g', 579),
          ('Salmon (cooked)',         NULL,         208,  20.0,  0.0, 13.0, 0.0,  0.0,  59, '100g', 208),
          ('Sweet Potato (baked)',    NULL,          90,   2.0, 21.0,  0.1, 3.3,  6.5,  36, '100g',  90),
          ('Cottage Cheese',          'Daisy',       98,  11.0,  3.4,  4.3, 0.0,  2.7, 364, '100g',  98),
          ('Broccoli (steamed)',      NULL,          35,   2.4,  7.2,  0.4, 2.6,  1.7,  41, '100g',  35);

END IF;
END $$;
