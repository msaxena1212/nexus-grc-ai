# Mock Users and Credentials

This document contains the test user accounts for the GRC platform. These users have different roles and access levels.

## How to Create Mock Users

To seed the database with mock users, call the `seed-mock-users` edge function:

```bash
# From the Supabase dashboard or via API
POST https://uaktcrxuuxyzjfssznde.supabase.co/functions/v1/seed-mock-users
```

Or use the Supabase CLI:
```bash
supabase functions invoke seed-mock-users
```

## Test User Credentials

### 1. Admin User
- **Email**: `admin@akzonobel.com`
- **Password**: `Admin@123456`
- **Role**: Super Admin
- **Access**: Full system access including user management, organization setup, and system configuration
- **Dashboard**: System-wide overview with user counts, organization management, and security alerts

### 2. Global GRC Director
- **Email**: `director@akzonobel.com`
- **Password**: `Director@123456`
- **Role**: Global GRC Director
- **Access**: Strategic oversight of all GRC activities across the organization
- **Dashboard**: Executive view with risk trends, audit overview, and compliance metrics

### 3. Environmental Compliance Officer
- **Email**: `compliance@akzonobel.com`
- **Password**: `Compliance@123456`
- **Role**: Environmental Compliance Officer
- **Access**: Manage compliance controls, execute tests, and update compliance status
- **Dashboard**: Compliance-focused view showing assigned controls, test schedules, and issues

### 4. Chemical Safety Specialist
- **Email**: `chemical@akzonobel.com`
- **Password**: `Chemical@123456`
- **Role**: Chemical Safety Specialist
- **Access**: Manage chemical inventory, MSDS documentation, and regulatory compliance
- **Dashboard**: Chemical management view with inventory, hazardous materials, and documentation status

### 5. Site Manager
- **Email**: `sitemanager@akzonobel.com`
- **Password**: `SiteManager@123456`
- **Role**: Site Manager
- **Access**: Site-level operations, incident management, and task assignments
- **Dashboard**: Operational view with site staff, assigned tasks, and incident tracking

### 6. Auditor
- **Email**: `auditor@akzonobel.com`
- **Password**: `Auditor@123456`
- **Role**: Audit Manager
- **Access**: Create and manage audits, document findings, and track remediation
- **Dashboard**: Audit-focused view with active engagements, scheduled audits, and findings

## Role-Based Access Control

Each user role has specific permissions:

### Super Admin
- Create/edit/delete organizations
- Manage all users and roles
- View system-wide analytics
- Access all modules without restrictions

### Global GRC Director
- View and manage all GRC activities
- Assign risks, audits, and compliance controls
- Approve policies and control frameworks
- View organization-wide reports

### Environmental Compliance Officer
- Create and manage compliance controls
- Execute control tests
- Update compliance evidence
- View environmental monitoring data

### Chemical Safety Specialist
- Add and manage chemicals
- Update MSDS documentation
- Track regulatory status (REACH, TSCA)
- Manage VOC content and restrictions

### Site Manager
- View site-specific incidents
- Manage assigned tasks
- Update incident status
- Access site compliance data

### Audit Manager
- Create and plan audits
- Assign audit team members
- Document findings
- Track audit completion

## Organization Structure

All mock users are assigned to the **AkzoNobel Global** organization, which is the parent organization for the demo environment.

## Security Notes

⚠️ **Important**: These are test credentials for development only. Never use these passwords in production.

- All passwords follow the format: `[Role]@123456`
- Users are created with email verification already confirmed
- Each user has a complete profile with name, job title, and department

## Next Steps After Seeding

1. Test each user's login
2. Verify role-based dashboard displays correctly
3. Test permission restrictions (e.g., auditor cannot manage users)
4. Assign specific risks, audits, or controls to test user workflows
