package ai.mobileagentos.nova.theme

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF0A84FF),
    secondary = Color(0xFF14B8A6),
    tertiary = Color(0xFF6366F1),
    background = Color(0xFFFFFFFF),
    surface = Color(0xFFF9FAFB),
    error = Color(0xFFEF4444),
    onPrimary = Color.White,
    onSecondary = Color.White,
    onTertiary = Color.White,
    onBackground = Color(0xFF1E293B),
    onSurface = Color(0xFF1E293B),
    onError = Color.White
)

@Composable
fun NOVATheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = Typography(),
        content = content
    )
}