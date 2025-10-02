import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface MockUser {
  email: string
  password: string
  firstName: string
  lastName: string
  role: string
  jobTitle: string
  department: string
}

const mockUsers: MockUser[] = [
  {
    email: 'admin@akzonobel.com',
    password: 'Admin@123456',
    firstName: 'John',
    lastName: 'Administrator',
    role: 'super_admin',
    jobTitle: 'System Administrator',
    department: 'IT'
  },
  {
    email: 'director@akzonobel.com',
    password: 'Director@123456',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'global_grc_director',
    jobTitle: 'Global GRC Director',
    department: 'GRC'
  },
  {
    email: 'compliance@akzonobel.com',
    password: 'Compliance@123456',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'environmental_compliance_officer',
    jobTitle: 'Environmental Compliance Officer',
    department: 'Environmental'
  },
  {
    email: 'chemical@akzonobel.com',
    password: 'Chemical@123456',
    firstName: 'Emma',
    lastName: 'Williams',
    role: 'chemical_safety_specialist',
    jobTitle: 'Chemical Safety Specialist',
    department: 'Safety'
  },
  {
    email: 'sitemanager@akzonobel.com',
    password: 'SiteManager@123456',
    firstName: 'David',
    lastName: 'Brown',
    role: 'site_manager',
    jobTitle: 'Site Manager',
    department: 'Operations'
  },
  {
    email: 'auditor@akzonobel.com',
    password: 'Auditor@123456',
    firstName: 'Lisa',
    lastName: 'Anderson',
    role: 'audit_manager',
    jobTitle: 'Senior Auditor',
    department: 'Audit'
  }
]

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get or create the default organization
    const { data: org, error: orgError } = await supabaseAdmin
      .from('organizations')
      .select('id')
      .eq('name', 'AkzoNobel Global')
      .single()

    let organizationId: string

    if (orgError || !org) {
      const { data: newOrg, error: createOrgError } = await supabaseAdmin
        .from('organizations')
        .insert({
          name: 'AkzoNobel Global',
          organization_type: 'parent',
          region: 'Global HQ',
          country: 'Netherlands',
          description: 'Global headquarters organization'
        })
        .select('id')
        .single()

      if (createOrgError) throw createOrgError
      organizationId = newOrg.id
    } else {
      organizationId = org.id
    }

    const results = []

    for (const user of mockUsers) {
      // Create user in auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          first_name: user.firstName,
          last_name: user.lastName
        }
      })

      if (authError) {
        results.push({ email: user.email, status: 'error', error: authError.message })
        continue
      }

      // Update profile
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .update({
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          job_title: user.jobTitle,
          department: user.department,
          organization_id: organizationId
        })
        .eq('id', authData.user.id)

      if (profileError) {
        results.push({ email: user.email, status: 'profile_error', error: profileError.message })
        continue
      }

      // Assign role
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          organization_id: organizationId,
          role: user.role
        })

      if (roleError) {
        results.push({ email: user.email, status: 'role_error', error: roleError.message })
        continue
      }

      results.push({ 
        email: user.email, 
        status: 'success',
        credentials: {
          email: user.email,
          password: user.password,
          role: user.role
        }
      })
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mock users seeded successfully',
        results 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
