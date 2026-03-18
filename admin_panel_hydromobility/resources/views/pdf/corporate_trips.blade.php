<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: DejaVu Sans;
            font-size: 9px;
            /* ↓ from 12px */
        }

        th {
            background: #4361ee;
            color: #fff;
            padding: 4px;
            /* ↓ */
            font-size: 9px;
        }

        td {
            border: 1px solid #ddd;
            padding: 3px;
            /* ↓ */
            font-size: 9px;
        }

        table {
            width: 100%;
            table-layout: fixed;
            /* VERY IMPORTANT */
        }

        th,
        td {
            word-wrap: break-word;
            white-space: normal;
        }
    </style>

</head>

<body>

    <h2>Trip Data Report</h2>

    <div class="meta">
        <strong>Company:</strong> {{ $statement->company_name }} <br>
        <strong>Period:</strong>
        {{ $startDate->format('M d') }} - {{ $endDate->format('M d, Y') }} <br>
        <strong>Generated:</strong> {{ now()->format('d M Y') }}
    </div>

    <table>
        <thead>
            <tr>
                <th>Trip ID</th>
                <th>Ride Booker</th>
                <th>Ride Booker Name</th>
                <th>Ride Booker Number</th>
                <th>Driver Name</th>
                <th>Company</th>
                <th>Customer Note</th>
                <th>Driver Note</th>
                <th>Pickup Date</th>
                <th>Pickup Address</th>
                <th>Drop Address</th>
                <th>Tax</th>
                <th>Vehicle Number</th>
                <th>Payment Method</th>
                <th>Promo Code</th>
                <th>Surge</th>
                <th>Sub Total</th>
                <th>Discount</th>
                <th>Total Fare</th>
            </tr>
        </thead>
        <tbody>
            @foreach($trips as $trip)
            <tr>
                <td class="center">{{ $trip->id }}</td>
                <td>{{ $trip->ride_booker }}</td>
                <td>{{ $trip->agent_name ?? '-'}}</td>
                <td>{{ $trip->agent_phone_number }}</td>
                <td>{{ $trip->driver }}</td>
                <td>{{ $trip->company_name ?? '-'}}</td>
                <td>{{ $trip->customer_note ?? '-'}}</td>
                <td>{{ $trip->driver_note ?? '-'}}</td>
                <td class="center">{{ \Carbon\Carbon::parse($trip->pickup_date)->format('d M Y') }}</td>
                <td class="center">{{ $trip->pickup_address }}</td>
                <td class="center">{{ $trip->drop_address }}</td>
                <td class="center">{{ $trip->tax }}</td>
                <td class="center">{{ $trip->vehicle_id }}</td>
                <td class="center">{{ $trip->payment_method }}</td>
                <td class="center">{{ $trip->promo_code ?? '-'}}</td>
                <td class="center">{{ $trip->surge }}</td>
                <td class="center">{{ $trip->sub_total }}</td>
                <td class="center">{{ $trip->discount }}</td>
                <td class="right">₹ {{ number_format($trip->total, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <br>

    <table width="40%" align="right">
        <tr>
            <td><strong>Sub Total</strong></td>
            <td class="right">₹ {{ number_format($statement->sub_total, 2) }}</td>
        </tr>
        <tr>
            <td><strong>Tax</strong></td>
            <td class="right">₹ {{ number_format($statement->tax, 2) }}</td>
        </tr>
        <tr>
            <td><strong>Service Fee</strong></td>
            <td class="right">₹ {{ number_format($statement->service_fee, 2) }}</td>
        </tr>
        <tr>
            <td><strong>Total</strong></td>
            <td class="right"><strong>₹ {{ number_format($statement->total, 2) }}</strong></td>
        </tr>
    </table>

</body>

</html>