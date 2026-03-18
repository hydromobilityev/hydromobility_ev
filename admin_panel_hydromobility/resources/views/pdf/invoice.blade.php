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
            margin: 0;
            padding: 0;
            background: #fff;
        }

        * {
            box-sizing: border-box;
        }

        /* Invoice wrapper */
        .invoice {
            width: 100%;
            min-height: 257mm;
            display: flex;
            flex-direction: column;
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

        /* Items table */
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

        .invoice-table td.text-left {
            text-align: left;
        }

        .invoice-table tr:nth-child(even) {
            background: #f9f9f9;
        }

        /* Totals */
        .totals-wrapper {
            display: table;
            width: 100%;
            margin-top: 20px;
        }

        .totals {
            display: table-cell;
            width: 40%;
        }

        .totals table td {
            border: 1px solid #ccc;
            padding: 8px;
        }

        .totals table tr:last-child {
            font-weight: bold;
            background: #f2f2f2;
        }

        /* Footer */
        .footer {
            margin-top: auto;
            text-align: center;
            font-size: 11px;
            color: #555;
            border-top: 1px solid #ccc;
            padding-top: 12px;
            line-height: 1.6;
        }
    </style>

</head>

<body>



    <!-- A4 Invoice Container -->
    <div class="invoice">

        <!-- Header: Logo left, Invoice details right -->
        <table class="header-table no-border">
            <tr>
                <td width="50%">
                    <img src="{{ public_path('uploads/images/logo.png') }}"
                        alt="HydroMobility"
                        style="height:100px;">

                </td>

                <td width="50%" class="text-right">
                    <div class="invoice-title">INVOICE</div>
                    <div><strong>Date:</strong> {{ explode(' – ', $invoice_period)[0] }}</div>
                </td>
            </tr>
        </table>

        <hr>

        <!-- Client & Company Details -->
        <table class="details-table no-border">
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
        <table class="no-border" style="margin-top: 15px; margin-bottom: 10px;">
            <tr>
                <td>
                    <strong>Invoice Period:</strong>{{ $invoice_period }}
                </td>
            </tr>
        </table>

        <!-- Invoice Items Table -->
        <table class="invoice-table">
            <thead>
                <tr>
                    <th width="45%">Description</th>
                    <th width="15%" class="text-right">Sum (KES)</th>
                    <th width="10%" class="text-right">TAX %</th>
                    <th width="15%" class="text-right">TAX (KES)</th>
                    <th width="15%" class="text-right">Total Sum (KES)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>KE Transportation Services rendered by
                        Ride Booker in the period{{ $invoice_period }}</td>
                    <td class="text-right"> {{ number_format($sub_total, 2) }}</td>
                    <td class="text-right"> 0.00</td>
                    <td class="text-right">0.00</td>
                    <td class="text-right">{{ number_format($sub_total, 2) }}</td>
                </tr>
                <tr>
                    <td>Business service fee</td>
                    <td class="text-right">{{ $admin_commission_percent }}</td>
                    <td class="text-right">{{ $taxPercentage }}%</td>
                    <td class="text-right">{{ number_format($tax, 2) }}</td>
                    <td class="text-right"> {{ number_format($admin_plus_tax, 2) }}</td>
                </tr>

            </tbody>
        </table>

        <!-- Totals -->
        <table class="totals-table">
            <tr>
                <td><strong>Total (KES)</strong></td>
                <td class="text-right">{{ number_format($total_excl_vat, 2) }}</td>
            </tr>
            <tr>
                <td><strong>VAT (KES)</strong></td>
                <td class="text-right">{{ number_format($tax, 2) }}</td>
            </tr>
            <tr>
                <td><strong>Total Including VAT (KES)</strong></td>
                <td class="text-right"><strong>{{ number_format($total_incl_vat, 2) }}</strong></td>
            </tr>
        </table>

        <div class="clear"></div>

        <!-- Footer -->
        <div class="footer">
            <div>Thank you for your business!</div>
            <div>{{ $contact->email }} | {{ $contact->address }} | {{ $contact->phone_number }}</div>

        </div>

    </div>

    <script>
        // Optional: Print instructions
        console.log("Click Print button to check A4 layout");
        console.log("Ensure in print settings: Paper Size = A4, Margins = Default");

        window.onbeforeprint = function() {
            console.log("Print Preview Opening...");
            console.log("Check if all content fits within A4 boundaries");
        };
    </script>

</body>

</html>