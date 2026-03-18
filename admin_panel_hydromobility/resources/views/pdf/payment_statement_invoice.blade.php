<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Invoice</title>

    <style>
        @page {
            size: A4;
            margin: 20mm;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        .no-border td {
            border: none;
            padding: 4px 0;
            vertical-align: top;
        }

        .invoice-title {
            font-size: 22px;
            font-weight: bold;
            color: #2c3e50;
        }

        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        hr {
            border: none;
            border-top: 2px solid #2c3e50;
            margin: 12px 0;
        }

        .invoice-table th,
        .invoice-table td {
            border: 1px solid #ccc;
            padding: 8px;
            font-size: 11px;
        }

        .invoice-table th {
            background: #2c3e50;
            color: #fff;
            text-align: center;
        }

        .invoice-table td {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .text-left {
            text-align: left;
        }

        .invoice-table tr:nth-child(even) {
            background: #f9f9f9;
        }

        .totals-table {
            margin-top: 20px;
            width: 40%;
            float: right;
        }

        .totals-table td {
            border: 1px solid #ccc;
            padding: 8px;
        }

        .totals-table tr:last-child {
            font-weight: bold;
            background: #f2f2f2;
        }

        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 11px;
            color: #555;
            border-top: 1px solid #ccc;
            padding-top: 12px;
        }
    </style>
</head>

<body>

    <div class="invoice">

        <!-- Header -->
        <table class="no-border">
            <tr>
                <td width="50%">
                    <img src="{{ public_path('uploads/images/logo.png') }}"
                        style="height:90px;">
                </td>
                <td width="50%" class="text-right">
                    <div class="invoice-title">INVOICE</div>
                    <div><strong>Date:</strong> {{ explode(' – ', $invoice_period)[0] }}</div>
                </td>
            </tr>
        </table>

        <hr>

        <!-- Bill To -->
        <table class="no-border">
            <tr>
                <td width="50%">
                    <div class="section-title">Bill To</div>
                    <div>{{ $corporate->company_name }}</div>
                    <div>{{ $corporate->first_name }} {{ $corporate->last_name }}</div>
                    <div>Email: {{ $corporate->email }}</div>
                    <div>{{ $corporate->registration_number }}</div>
                </td>

                <td width="50%">
                    <div class="section-title">{{ $appSetting->app_name }}</div>
                    <div>{{ $contact->email }}</div>
                    <div>{{ $contact->address }}</div>
                    <div>{{ $contact->phone_number }}</div>
                </td>
            </tr>
        </table>

        <!-- Period -->
        <table class="no-border" style="margin-top:15px;">
            <tr>
                <td>
                    <strong>Invoice Period:</strong> {{ $invoice_period }}
                </td>
            </tr>
        </table>

        <!-- Items -->
        <table class="invoice-table" style="margin-top:15px;">
            <thead>
                <tr>
                    <th width="45%">Description</th>
                    <th width="15%">Sum (KES)</th>
                    <th width="10%">TAX %</th>
                    <th width="15%">TAX (KES)</th>
                    <th width="15%">Total (KES)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-left">
                        Transportation services rendered during {{ $invoice_period }}
                    </td>
                    <td class="text-right">{{ number_format($sub_total, 2) }}</td>
                    <td class="text-right">0%</td>
                    <td class="text-right">0.00</td>
                    <td class="text-right">{{ number_format($sub_total, 2) }}</td>
                </tr>

                <tr>
                    <td class="text-left">Business service fee</td>
                    <td class="text-right">{{ number_format($admin_commission_percent, 2) }}</td>
                    <td class="text-right">{{ $taxPercentage }}%</td>
                    <td class="text-right">{{ number_format($tax, 2) }}</td>
                    <td class="text-right">{{ number_format($admin_plus_tax, 2) }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Totals -->
        <table class="totals-table">
            <tr>
                <td>Total (KES)</td>
                <td class="text-right">{{ number_format($total_excl_vat, 2) }}</td>
            </tr>
            <tr>
                <td>VAT (KES)</td>
                <td class="text-right">{{ number_format($tax, 2) }}</td>
            </tr>
            <tr>
                <td>Total Incl. VAT (KES)</td>
                <td class="text-right">{{ number_format($total_incl_vat, 2) }}</td>
            </tr>
        </table>

        <div style="clear:both;"></div>

        <!-- Footer -->
        <div class="footer">
            <div>Thank you for your business!</div>
            <div>{{ $contact->email }} | {{ $contact->address }} | {{ $contact->phone_number }}</div>
        </div>

    </div>

</body>

</html>