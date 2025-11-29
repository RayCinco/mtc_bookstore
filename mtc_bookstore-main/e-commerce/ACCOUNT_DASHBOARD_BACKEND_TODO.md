# Account Dashboard - Backend Implementation Required

## Avatar Upload Endpoint

The frontend expects a Laravel API endpoint for avatar uploads:

### Endpoint

```
POST /api/update-avatar
```

### Request Format

- **Content-Type**: `multipart/form-data`
- **Body**:
  - `avatar`: Image file (JPG, PNG, GIF, etc.)
  - `user_id`: Integer

### Response Format

```json
{
  "success": true,
  "avatar": "http://your-domain.com/storage/avatars/user-123.jpg",
  "message": "Avatar updated successfully"
}
```

### Error Response

```json
{
  "error": "Error message here"
}
```

### Laravel Implementation Example

```php
// routes/api.php
Route::post('/update-avatar', [UserController::class, 'updateAvatar']);

// app/Http/Controllers/UserController.php
public function updateAvatar(Request $request)
{
    $request->validate([
        'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        'user_id' => 'required|integer|exists:users,id'
    ]);

    $user = User::findOrFail($request->user_id);

    // Delete old avatar if exists
    if ($user->avatar) {
        Storage::disk('public')->delete($user->avatar);
    }

    // Store new avatar
    $avatarPath = $request->file('avatar')->store('avatars', 'public');

    // Update user record
    $user->avatar = $avatarPath;
    $user->save();

    return response()->json([
        'success' => true,
        'avatar' => Storage::url($avatarPath),
        'message' => 'Avatar updated successfully'
    ]);
}
```

### Migration Required

Add `avatar` column to users table if it doesn't exist:

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('avatar')->nullable()->after('email');
});
```

## Notes

- Ensure `storage/app/public` is linked to `public/storage` using `php artisan storage:link`
- Validate file types and sizes on the backend
- Consider implementing image optimization/resizing for better performance
- The frontend already handles:
  - File size validation (5MB max)
  - Image type validation
  - Preview before upload
  - Loading states
  - Success/error toast messages
