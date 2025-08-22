import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { BusinessAccount } from '@/models/BusinessAccount'
import { connectToDB } from '@/lib/db'
import { ForbiddenError } from '@/errors'

export async function GET() {
  await connectToDB()
  
  const session = await getServerSession(authOptions)
  if (!session?.user?.role === 'admin') {
    throw new ForbiddenError('Admin access required')
  }

  const businessAccount = await BusinessAccount.findOne()
  if (!businessAccount) {
    return Response.json({
      ok: false,
      code: 'not_found',
      message: 'Business account not configured'
    }, { status: 404 })
  }

  return Response.json({
    ok: true,
    data: {
      _id: businessAccount._id,
      businessName: businessAccount.businessName,
      tillOrPaybill: businessAccount.tillOrPaybill,
      phoneNumber: businessAccount.phoneNumber,
      mpesa: {
        shortcode: businessAccount.mpesa.shortcode,
        environment: businessAccount.mpesa.environment,
        callbackUrl: businessAccount.mpesa.callbackUrl
      },
      createdAt: businessAccount.createdAt,
      updatedAt: businessAccount.updatedAt
    }
  })
}

export async function PATCH(request) {
  await connectToDB()
  
  const session = await getServerSession(authOptions)
  if (!session?.user?.role === 'admin') {
    throw new ForbiddenError('Admin access required')
  }

  const body = await request.json()
  const businessAccount = await BusinessAccount.findOne()
  
  if (!businessAccount) {
    return Response.json({
      ok: false,
      code: 'not_found',
      message: 'Business account not configured'
    }, { status: 404 })
  }

  // Update fields
  if (body.businessName) businessAccount.businessName = body.businessName
  if (body.tillOrPaybill) businessAccount.tillOrPaybill = body.tillOrPaybill
  if (body.phoneNumber) businessAccount.phoneNumber = body.phoneNumber
  if (body.mpesa) {
    if (body.mpesa.shortcode) businessAccount.mpesa.shortcode = body.mpesa.shortcode
    if (body.mpesa.passkey) businessAccount.mpesa.passkey = body.mpesa.passkey
    if (body.mpesa.environment) businessAccount.mpesa.environment = body.mpesa.environment
    if (body.mpesa.callbackUrl) businessAccount.mpesa.callbackUrl = body.mpesa.callbackUrl
  }

  await businessAccount.save()

  return Response.json({
    ok: true,
    data: {
      _id: businessAccount._id,
      businessName: businessAccount.businessName,
      tillOrPaybill: businessAccount.tillOrPaybill,
      phoneNumber: businessAccount.phoneNumber,
      mpesa: {
        shortcode: businessAccount.mpesa.shortcode,
        environment: businessAccount.mpesa.environment,
        callbackUrl: businessAccount.mpesa.callbackUrl
      },
      createdAt: businessAccount.createdAt,
      updatedAt: businessAccount.updatedAt
    }
  })
}
