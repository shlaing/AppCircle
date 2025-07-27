<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\StreamedResponse;

class OllamaController extends Controller
{
    public function index()
    {
        return Inertia::render('Apps/Ollama', ['response' => '']);
    }

    public function ask(Request $request)
    {
        try {
            // Validate the request
            $request->validate([
                'prompt' => 'required|string|max:1000'
            ]);

            $response = Http::timeout(60)->post('http://host.docker.internal:11434/api/generate', [
                'model' => 'llama3',
                'prompt' => $request->prompt,
                'stream' => false,
            ]);

            // Check if the HTTP request was successful
            if ($response->failed()) {
                throw new \Exception('Ollama service is unavailable. Status: ' . $response->status());
            }

            $responseData = $response->json();
            
            if (!$responseData || !isset($responseData['response'])) {
                throw new \Exception('Invalid response format from Ollama service');
            }

            return response()->json([
                'success' => true,
                'response' => $responseData['response'] ?? 'No reply from Ollama',
                'model' => $responseData['model'] ?? 'llama3',
                'done' => $responseData['done'] ?? true
            ]);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Validation failed',
                'message' => $e->getMessage(),
                'errors' => $e->errors()
            ], 422);
            
        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Connection failed',
                'message' => 'Unable to connect to Ollama service. Please ensure Ollama is running.'
            ], 503);
            
        } catch (\Illuminate\Http\Client\RequestException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Request failed',
                'message' => 'Request to Ollama service failed: ' . $e->getMessage()
            ], 500);
            
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Ollama API Error: ' . $e->getMessage(), [
                'prompt' => $request->prompt ?? 'N/A',
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'error' => 'Internal server error',
                'message' => 'An unexpected error occurred while processing your request.'
            ], 500);
        }
    }
    
}
