-- Insert profiles for existing users (using INSERT...ON CONFLICT to handle if they exist)
INSERT INTO profiles (id, first_name, last_name, email, job_title, department, organization_id)
SELECT 
  u.id,
  CASE u.email
    WHEN 'admin@akzonobel.com' THEN 'John'
    WHEN 'director@akzonobel.com' THEN 'Sarah'
    WHEN 'compliance@akzonobel.com' THEN 'Michael'
    WHEN 'chemical@akzonobel.com' THEN 'Emma'
    WHEN 'sitemanager@akzonobel.com' THEN 'David'
  END as first_name,
  CASE u.email
    WHEN 'admin@akzonobel.com' THEN 'Administrator'
    WHEN 'director@akzonobel.com' THEN 'Johnson'
    WHEN 'compliance@akzonobel.com' THEN 'Chen'
    WHEN 'chemical@akzonobel.com' THEN 'Williams'
    WHEN 'sitemanager@akzonobel.com' THEN 'Brown'
  END as last_name,
  u.email,
  CASE u.email
    WHEN 'admin@akzonobel.com' THEN 'System Administrator'
    WHEN 'director@akzonobel.com' THEN 'Global GRC Director'
    WHEN 'compliance@akzonobel.com' THEN 'Environmental Compliance Officer'
    WHEN 'chemical@akzonobel.com' THEN 'Chemical Safety Specialist'
    WHEN 'sitemanager@akzonobel.com' THEN 'Site Manager'
  END as job_title,
  CASE u.email
    WHEN 'admin@akzonobel.com' THEN 'IT'
    WHEN 'director@akzonobel.com' THEN 'GRC'
    WHEN 'compliance@akzonobel.com' THEN 'Environmental'
    WHEN 'chemical@akzonobel.com' THEN 'Safety'
    WHEN 'sitemanager@akzonobel.com' THEN 'Operations'
  END as department,
  (SELECT id FROM organizations WHERE name = 'AkzoNobel Global' LIMIT 1)
FROM auth.users u
WHERE u.email IN ('admin@akzonobel.com', 'director@akzonobel.com', 'compliance@akzonobel.com', 'chemical@akzonobel.com', 'sitemanager@akzonobel.com')
ON CONFLICT (id) 
DO UPDATE SET
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  email = EXCLUDED.email,
  job_title = EXCLUDED.job_title,
  department = EXCLUDED.department,
  organization_id = EXCLUDED.organization_id;