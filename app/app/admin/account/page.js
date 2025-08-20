'use client'
import { useState } from 'react'
import { Card, Form, Input, Button, Toggle, SecretsInput } from '@/components/ui'
import { updateBusinessAccount } from './actions'

export default function AccountPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    tillOrPaybill: '',
    phoneNumber: '',
    mpesa: {
      shortcode: '',
      passkey: '',
      environment: 'sandbox',
      callbackUrl: ''
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateBusinessAccount(formData)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Business Account</h1>

      <Card>
        <Form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <Input
              label="Business Name"
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              required
            />

            <Input
              label="Till/Paybill Number"
              value={formData.tillOrPaybill}
              onChange={(e) => setFormData({...formData, tillOrPaybill: e.target.value})}
              required
            />

            <Input
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              required
            />

            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold mb-4">M-Pesa Settings</h2>

              <Input
                label="Shortcode"
                value={formData.mpesa.shortcode}
                onChange={(e) => setFormData({
                  ...formData,
                  mpesa: {...formData.mpesa, shortcode: e.target.value}
                })}
                required
              />

              <SecretsInput
                label="Passkey"
                value={formData.mpesa.passkey}
                onChange={(e) => setFormData({
                  ...formData,
                  mpesa: {...formData.mpesa, passkey: e.target.value}
                })}
                required
              />

              <Toggle
                label="Production Environment"
                checked={formData.mpesa.environment === 'production'}
                onChange={(checked) => setFormData({
                  ...formData,
                  mpesa: {...formData.mpesa, environment: checked ? 'production' : 'sandbox'}
                })}
              />

              <Input
                label="Callback URL"
                value={formData.mpesa.callbackUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  mpesa: {...formData.mpesa, callbackUrl: e.target.value}
                })}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  )
}
