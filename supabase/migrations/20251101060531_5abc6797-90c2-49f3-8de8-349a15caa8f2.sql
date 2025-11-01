-- Update profiles for existing users
UPDATE profiles p
SET 
  first_name = CASE u.email
    WHEN 'admin@akzonobel.com' THEN 'John'
    WHEN 'director@akzonobel.com' THEN 'Sarah'
    WHEN 'compliance@akzonobel.com' THEN 'Michael'
    WHEN 'chemical@akzonobel.com' THEN 'Emma'
    WHEN 'sitemanager@akzonobel.com' THEN 'David'
  END,
  last_name = CASE u.email
    WHEN 'admin@akzonobel.com' THEN 'Administrator'
    WHEN 'director@akzonobel.com' THEN 'Johnson'
    WHEN 'compliance@akzonobel.com' THEN 'Chen'
    WHEN 'chemical@akzonobel.com' THEN 'Williams'
    WHEN 'sitemanager@akzonobel.com' THEN 'Brown'
  END,
  job_title = CASE u.email
    WHEN 'admin@akzonobel.com' THEN 'System Administrator'
    WHEN 'director@akzonobel.com' THEN 'Global GRC Director'
    WHEN 'compliance@akzonobel.com' THEN 'Environmental Compliance Officer'
    WHEN 'chemical@akzonobel.com' THEN 'Chemical Safety Specialist'
    WHEN 'sitemanager@akzonobel.com' THEN 'Site Manager'
  END,
  department = CASE u.email
    WHEN 'admin@akzonobel.com' THEN 'IT'
    WHEN 'director@akzonobel.com' THEN 'GRC'
    WHEN 'compliance@akzonobel.com' THEN 'Environmental'
    WHEN 'chemical@akzonobel.com' THEN 'Safety'
    WHEN 'sitemanager@akzonobel.com' THEN 'Operations'
  END,
  email = u.email,
  organization_id = (SELECT id FROM organizations WHERE name = 'AkzoNobel Global' LIMIT 1)
FROM auth.users u
WHERE p.id = u.id 
  AND u.email IN ('admin@akzonobel.com', 'director@akzonobel.com', 'compliance@akzonobel.com', 'chemical@akzonobel.com', 'sitemanager@akzonobel.com');